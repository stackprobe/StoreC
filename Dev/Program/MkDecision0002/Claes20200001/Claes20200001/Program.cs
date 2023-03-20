using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using Charlotte.Commons;
using Charlotte.Tests;
using Charlotte.Utilities;

namespace Charlotte
{
	class Program
	{
		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2);
		}

		private void Main2(ArgsReader ar)
		{
			if (ProcMain.DEBUG)
			{
				Main3();
			}
			else
			{
				Main4(ar);
			}
			SCommon.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			Main4(new ArgsReader(new string[] { @"C:\temp\Input.csv", @"C:\temp\Output.csv" }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			SCommon.Pause();
		}

		private void Main4(ArgsReader ar)
		{
			try
			{
				Main5(ar);
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				//MessageBox.Show("" + ex, Path.GetFileNameWithoutExtension(ProcMain.SelfFile) + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private class DecisionValueInfo
		{
			public string StrValue;
			public bool[] Row;
		}

		private class DecisionInfo
		{
			public string Name;
			public DecisionValueInfo[] Values;
		}

		private void Main5(ArgsReader ar)
		{
			string csvFile = SCommon.MakeFullPath(ar.NextArg());
			string destFile = SCommon.MakeFullPath(ar.NextArg());

			ar.End();

			if (!File.Exists(csvFile))
				throw new Exception("no csvFile");

			List<string[][]> kvsList = new List<string[][]>();

			using (CsvFileReader reader = new CsvFileReader(csvFile))
			{
				string[] row = reader.ReadRow();

				foreach (string cell in row)
				{
					kvsList.Add(JsonToKVList(JsonNode.Load(cell), "").ToArray());
				}
			}

			DecisionInfo[] decisions = SCommon
				.Concat(kvsList)
				.Select(v => v[0])
				.DistinctOrderBy(SCommon.Comp)
				.Select(v => new DecisionInfo() { Name = v })
				.ToArray();

			foreach (DecisionInfo decision in decisions)
			{
				List<string> values = SCommon
					.Concat(kvsList)
					.Where(v => v[0] == decision.Name)
					.Select(v => v[1])
					.DistinctOrderBy(SCommon.Comp)
					.ToList();

				if (kvsList.Any(v => !v.Any(w => w[0] == decision.Name))) // HACK
				{
					values.Add(Consts.VALUE_NO_KEY);
				}

				decision.Values = values
					.Select(v => new DecisionValueInfo() { StrValue = v, Row = new bool[kvsList.Count] })
					.ToArray();
			}
			for (int index = 0; index < kvsList.Count; index++)
			{
				string[][] kvs = kvsList[index];

				foreach (DecisionInfo decision in decisions)
				{
					foreach (DecisionValueInfo decisionValue in decision.Values)
					{
						decisionValue.Row[index] =
							decisionValue.StrValue == Consts.VALUE_NO_KEY ?
							!kvs.Any(v => v[0] == decision.Name) :
							kvs.Any(v => v[0] == decision.Name && v[1] == decisionValue.StrValue);
					}
				}
			}

			using (CsvFileWriter writer = new CsvFileWriter(destFile))
			{
				foreach (DecisionInfo decision in decisions)
				{
					writer.WriteCell(decision.Name);
					writer.EndRow();

					foreach (DecisionValueInfo decisionValue in decision.Values)
					{
						writer.WriteCell("");
						writer.WriteCell(decisionValue.StrValue);

						foreach (bool flag in decisionValue.Row)
							writer.WriteCell(flag ? "○" : "");

						writer.EndRow();
					}
				}
			}
		}

		private IEnumerable<string[]> JsonToKVList(JsonNode root, string nameParent)
		{
			if (root.Map == null)
				throw new Exception("not Map (root element and array elements must be Map)");

			foreach (JsonNode.Pair pair in root.Map)
			{
				string name = nameParent + "/" + pair.Name;
				JsonNode value = pair.Value;

				if (value.Array != null)
				{
					yield return new string[] { name, "List" };

					foreach (JsonNode element in value.Array)
						foreach (var relay in JsonToKVList(element, name))
							yield return relay;
				}
				else if (value.Map != null)
				{
					yield return new string[] { name, "Map" };

					foreach (var relay in JsonToKVList(value, name))
						yield return relay;
				}
				else if (value.StringValue != null)
				{
					yield return new string[] { name, value.StringValue };
				}
				else if (value.WordValue != null)
				{
					yield return new string[] { name, value.WordValue };
				}
				else
				{
					throw null; // never
				}
			}
		}
	}
}
