using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0003
	{
		private const string R_DIR_01 = @"C:\home\画像\HPキャラ立ち絵\ウマ娘";
		private const string R_DIR_02 = @"C:\削除予定\20230202_ウマ娘Old";

		public void Test01()
		{
			string[][][] table = new string[] { R_DIR_01, R_DIR_02 }
				.Select(v => Directory.GetFiles(v).Select(w => new string[] { w, SCommon.Hex.ToString(SCommon.GetSHA512File(w)) }).ToArray())
				.ToArray();

			List<string[]> only1 = new List<string[]>();
			List<string[]> both1 = new List<string[]>();
			List<string[]> both2 = new List<string[]>();
			List<string[]> only2 = new List<string[]>();

			SCommon.Merge(table[0], table[1], (a, b) => SCommon.Comp(a[1], b[1]), only1, both1, both2, only2);

			Test01_a(only1, "only1");
			Test01_a(both1, "both1");
			Test01_a(both2, "both2");
			Test01_a(only2, "only2");
		}

		private void Test01_a(List<string[]> pairs, string bunrui)
		{
			SCommon.CreateDir(Path.Combine(SCommon.GetOutputDir(), bunrui));

			foreach (string[] pair in pairs)
			{
				File.Copy(pair[0], Path.Combine(SCommon.GetOutputDir(), bunrui, Path.GetFileName(pair[0])));
			}
		}

		private class ImageInfo
		{
			public string FilePath;
			public string Hash;
		}

		public void Test02()
		{
			ImageInfo[] images1 = Test02_a(R_DIR_01).ToArray();
			ImageInfo[] images2 = Test02_a(R_DIR_02).ToArray();

			string[][][] table = new string[] { R_DIR_01, R_DIR_02 }
				.Select(v => Directory.GetFiles(v).Select(w => new string[] { w, SCommon.Hex.ToString(SCommon.GetSHA512File(w)) }).ToArray())
				.ToArray();

			List<ImageInfo> only1 = new List<ImageInfo>();
			List<ImageInfo> both1 = new List<ImageInfo>();
			List<ImageInfo> both2 = new List<ImageInfo>();
			List<ImageInfo> only2 = new List<ImageInfo>();

			SCommon.Merge(images1, images2, (a, b) => SCommon.Comp(a.Hash, b.Hash), only1, both1, both2, only2);

			Test02_b(only1, "only1");
			Test02_b(both1, "both1");
			Test02_b(both2, "both2");
			Test02_b(only2, "only2");
		}

		private IEnumerable<ImageInfo> Test02_a(string dir)
		{
			foreach (string file in Directory.GetFiles(dir))
			{
				Console.WriteLine("< " + file); // cout

				Canvas canvas = Canvas.LoadFromFile(file);
				canvas = canvas.Expand(100, 100, 4);
				string hash = SCommon.Hex.ToString(SCommon.GetSHA512(writePart =>
				{
					for (int x = 0; x < canvas.W; x++)
					{
						for (int y = 0; y < canvas.H; y++)
						{
							byte[] data = new byte[] 
							{
								(byte)canvas[x, y].R, 
								(byte)canvas[x, y].G,
								(byte)canvas[x, y].B,
							};

							writePart(data, 0, data.Length);
						}
					}
				}));

				Console.WriteLine("> " + hash); // cout

				yield return new ImageInfo()
				{
					FilePath = file,
					Hash = hash,
				};
			}
		}

		private void Test02_b(List<ImageInfo> images, string bunrui)
		{
			SCommon.CreateDir(Path.Combine(SCommon.GetOutputDir(), bunrui));

			foreach (ImageInfo image in images)
			{
				File.Copy(image.FilePath, Path.Combine(SCommon.GetOutputDir(), bunrui, Path.GetFileName(image.FilePath)));
			}
		}

		public void Test03()
		{
			Test03_a(
				@"C:\home\画像\HPキャラ立ち絵\ウマ娘\勝負服_アイネスフウジン.png",
				@"C:\削除予定\20230202_ウマ娘Old\アイネスフウジン_02.png"
				);
			Test03_a(
				@"C:\home\画像\HPキャラ立ち絵\ウマ娘\勝負服_アグネスタキオン.png",
				@"C:\削除予定\20230202_ウマ娘Old\アグネスタキオン_02.png"
				);
			Test03_a(
				@"C:\home\画像\HPキャラ立ち絵\ウマ娘\勝負服_アグネスデジタル.png",
				@"C:\削除予定\20230202_ウマ娘Old\アグネスデジタル_02.png"
				);
			Test03_a(
				@"C:\home\画像\HPキャラ立ち絵\ウマ娘\勝負服_ウイニングチケット.png",
				@"C:\削除予定\20230202_ウマ娘Old\ウイニングチケット_02.png"
				);
		}

		private void Test03_a(string file1, string file2)
		{
			Canvas image1 = Canvas.LoadFromFile(file1);
			Canvas image2 = Canvas.LoadFromFile(file2);

			Console.WriteLine(image1.W);
			Console.WriteLine(image2.W);
			Console.WriteLine(image1.H);
			Console.WriteLine(image2.H);

			//if (image1.W != image2.W) throw null;
			//if (image1.H != image2.H) throw null;

			//int w = image1.W;
			//int h = image1.H;
			int w = Math.Min(image1.W, image2.W);
			int h = Math.Min(image1.H, image2.H);

			// - - -

			//image1 = image1.GetSubImage(new I4Rect(image1.W - w, image1.H - h, w, h));
			//image2 = image2.GetSubImage(new I4Rect(image2.W - w, image2.H - h, w, h));

			// - - -

			Canvas dest = new Canvas(w, h);

			for (int x = 0; x < w; x++)
			{
				for (int y = 0; y < h; y++)
				{
					dest[x, y] = new I4Color(
						image1[x, y].R ^ image2[x, y].R,
						image1[x, y].G ^ image2[x, y].G,
						image1[x, y].B ^ image2[x, y].B,
						255
						);
				}
			}
			dest.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
