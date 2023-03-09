using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0005
	{
		public void Test01()
		{
			Console.WriteLine(string.Join(" ", SCommon.Serializer.I.Split("7EAGNjYGDwSM3JyddhBbESCwoq2YCM8PyinBRFAJsSOoAd4")));
		}

		public void Test02()
		{
			int d = 0;

			foreach (int c in Unsupplier(GetT(() =>
			{
				int count = 0;
				Func<int> getter = () => count++;
				return getter;
			}
			)))
			{
				Console.WriteLine(c);

				if (100 < ++d)
					break;
			}
		}

		private T GetT<T>(Func<T> getter)
		{
			return getter();
		}

		private IEnumerable<T> Unsupplier<T>(Func<T> getter)
		{
			for (; ; )
			{
				yield return getter();
			}
		}
	}
}
