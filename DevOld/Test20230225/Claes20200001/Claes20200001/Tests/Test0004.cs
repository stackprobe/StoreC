using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0004
	{
		private const string SQLITE_PROGRAM = @"C:\Berry\app\sqlite-tools-win32-x86-3410000\sqlite3.exe";

		public void Test01()
		{
			string file1 = @"C:\temp\1.csv";
			string file2 = @"C:\temp\2.csv";

			{
				string[][] rows;

				using (CsvFileReader reader = new CsvFileReader(@"C:\temp\Customers.csv"))
				{
					rows = reader.ReadToEnd();
				}

				Array.Sort(rows, (a, b) => SCommon.Comp(a[0], b[0]));
				using (CsvFileWriter writer = new CsvFileWriter(file1))
				{
					writer.WriteRows(rows);
				}
			}

			{
				File.WriteAllText(@"C:\temp\1.txt", "SELECT * FROM Customer", Encoding.ASCII);

				SCommon.Batch(
					new string[]
					{
						@"C:\Berry\app\sqlite-tools-win32-x86-3410000\sqlite3.exe DB < 1.txt > 2.txt"
					},
					@"C:\temp",
					SCommon.StartProcessWindowStyle_e.MINIMIZED
					);

				string[][] rows;

				{
					string[] lines = File.ReadAllLines(@"C:\temp\2.txt", Encoding.ASCII);

					rows = new string[lines.Length][];

					for (int index = 0; index < rows.Length; index++)
					{
						string line = lines[index];
						string[] row = line.Split('|');

						lines[index] = null;

						for (int colidx = 1; colidx <= 6; colidx++)
							row[colidx] = SCommon.ENCODING_SJIS.GetString(SCommon.Hex.ToBytes(row[colidx].Replace("-", "")));

						rows[index] = row;
					}
				}

				Array.Sort(rows, (a, b) => SCommon.Comp(a[0], b[0]));
				using (CsvFileWriter writer = new CsvFileWriter(file2))
				{
					writer.WriteRows(rows);
				}
			}

			// ----

			string hash1 = SCommon.Hex.ToString(SCommon.GetSHA512File(file1));
			string hash2 = SCommon.Hex.ToString(SCommon.GetSHA512File(file2));

			if (hash1 != hash2)
				throw null; // BUG !!!

			Console.WriteLine("OK!");
		}
	}
}
