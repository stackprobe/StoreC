using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			Console.WriteLine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop));
		}

		public void Test02()
		{
			List<object> list = new List<object>();

			for (int c = 0; c < 100; c++)
			{
				list.Add(Test02_a(2000000));
				list.Add(Test02_a(512000));
				list.Add(Test02_a(612000));

				// 追加で、細々としたもの
				for (int d = 0; d < 1000; d++)
					list.Add(Test02_a(1000));
			}

			SCommon.Pause();

			list = null;
			GC.Collect();

			//SCommon.Pause();
		}

		private byte[] Test02_a(int size)
		{
			byte[] data = new byte[size];

			for (int i = 0; i < size; i++)
				data[i] = SCommon.CRandom.GetByte();

			return data;
		}

		public void Test03()
		{
			List<object> list = new List<object>();

			for (int c = 0; c < 100; c++)
			{
				IEnumerable<bool> ea = Test03_a();
				IEnumerator<bool> e = ea.GetEnumerator();

				e.MoveNext();

				list.Add(e);
			}

			SCommon.Pause();

			list = null;
			GC.Collect();

			//SCommon.Pause();
		}

		private IEnumerable<bool> Test03_a()
		{
			List<object> list = new List<object>();

			list.Add(Test02_a(2000000));
			list.Add(Test02_a(512000));
			list.Add(Test02_a(612000));

			// 追加で、細々としたもの
			for (int d = 0; d < 1000; d++)
				list.Add(Test02_a(1000));

			// ----

			for (; ; )
				yield return true;
		}

		public void Test04()
		{
			List<object> list = new List<object>();

			for (int c = 0; c < 100; c++)
			{
				IEnumerable<bool> ea = Test03_a();
				IEnumerator<bool> e = ea.GetEnumerator();

				e.MoveNext();

				list.Add(e);
			}

			for (int c = 0; c < 1000000; c++)
			{
				if (c % 1000 == 0) Console.WriteLine(c); // cout
				if (c % 100 == 0) GC.Collect();

				IEnumerable<bool> ea = Test03_a();
				IEnumerator<bool> e = ea.GetEnumerator();

				e.MoveNext();

				list[SCommon.CRandom.GetInt(list.Count)] = e;
			}
		}
	}
}
