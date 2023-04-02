﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.GameCommons
{
	public class ResourceCluster
	{
		private string ClusterFile;

		private class ElementFileInfo
		{
			public string ResPath;
			public long StartPos;
			public int Length;
		}

		private List<ElementFileInfo> ElementFiles = new List<ElementFileInfo>();

		public ResourceCluster(string clusterFile)
		{
			this.ClusterFile = clusterFile;

			using (FileStream reader = new FileStream(this.ClusterFile, FileMode.Open, FileAccess.Read))
			{
				long clusterFileSize = reader.Length;

				while (reader.Position < clusterFileSize)
				{
					string resPath = SCommon.ReadPartString(reader);
					int length = SCommon.ReadPartInt(reader);

					this.ElementFiles.Add(new ElementFileInfo()
					{
						ResPath = resPath,
						StartPos = reader.Position,
						Length = length,
					});

					reader.Seek(length, SeekOrigin.Current);
				}
			}
		}

		public byte[] GetData(string resPath)
		{
			int index = SCommon.GetIndex(this.ElementFiles, v => SCommon.Comp(v.ResPath, resPath));

			if (index == -1)
				throw new Exception("resPath: " + resPath);

			ElementFileInfo elementFile = this.ElementFiles[index];
			byte[] data;

			using (FileStream reader = new FileStream(this.ClusterFile, FileMode.Open, FileAccess.Read))
			{
				reader.Seek(elementFile.StartPos, SeekOrigin.Begin);
				data = SCommon.Read(reader, elementFile.Length);
			}

			LiteShuffleP9(data);
			LiteMaskP6(data);
			data = SCommon.Decompress(data);

			return data;
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

		private static void LiteMaskP6(byte[] data)
		{
			int count = Math.Min(13, data.Length);

			for (int index = 0; index < count; index++)
			{
				data[index] ^= 0xa5;
			}
		}
	}
}
