using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.GameCommons
{
	public class ClusterFile
	{
		private string ClusterFilePath;

		private class ElementFileInfo
		{
			public string FilePath;
			public long StartPosition;
			public int Length;
		}

		private List<ElementFileInfo> ElementFiles = new List<ElementFileInfo>();

		public ClusterFile(string filePath)
		{
			this.ClusterFilePath = filePath;

			using (FileStream reader = new FileStream(this.ClusterFilePath, FileMode.Open, FileAccess.Read))
			{
				long length = reader.Length;

				while (reader.Position < length)
				{
					string elementFilePath = SCommon.ReadPartString(reader);
					int elementLength = SCommon.ReadPartInt(reader);

					this.ElementFiles.Add(new ElementFileInfo()
					{
						FilePath = elementFilePath,
						StartPosition = reader.Position,
						Length = elementLength,
					});

					reader.Seek(elementLength, SeekOrigin.Current);
				}
			}
		}

		public byte[] GetFileData(string filePath)
		{
			int index = SCommon.GetIndex(this.ElementFiles, v => SCommon.Comp(v.FilePath, filePath));

			if (index == -1)
				throw new Exception("不明なファイル：" + filePath);

			ElementFileInfo elementFile = this.ElementFiles[index];
			byte[] fileData;

			using (FileStream reader = new FileStream(this.ClusterFilePath, FileMode.Open, FileAccess.Read))
			{
				reader.Seek(elementFile.StartPosition, SeekOrigin.Begin);
				fileData = SCommon.Read(reader, elementFile.Length);
			}

			LiteShuffleP9(fileData);
			fileData = SCommon.Decompress(fileData);

			return fileData;
		}

		private static void LiteShuffleP9(byte[] data)
		{
			int l = 0;
			int r = data.Length - 1;
			int rr = Math.Max(1, data.Length / 23);

			while (l < r)
			{
				SCommon.Swap(data, l, r);

				l++;
				r -= rr;
			}
		}
	}
}
