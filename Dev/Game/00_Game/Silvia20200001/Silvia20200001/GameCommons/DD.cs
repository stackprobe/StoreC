using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using DxLibDLL;
using Charlotte.Commons;

namespace Charlotte.GameCommons
{
	/// <summary>
	/// ゲームに関する共通機能・便利機能はできるだけこのクラスに集約する。
	/// </summary>
	public static class DD
	{
		private static Func<string, byte[]> PF_GetResFileData = null;

		public static byte[] GetResFileData(string filePath)
		{
			if (PF_GetResFileData == null)
			{
				string clusterFilePath = Path.Combine(ProcMain.SelfDir, "Resource.dat");

				if (File.Exists(clusterFilePath))
				{
					ClusterFile clusterFile = new ClusterFile(clusterFilePath);
					PF_GetResFileData = p => clusterFile.GetFileData(p);
				}
				else
				{
					PF_GetResFileData = p => File.ReadAllBytes(Path.Combine(@"..\..\..\..\Resource", p));
				}
			}
			return PF_GetResFileData(filePath);
		}

		public static void EachFrame()
		{
			GC.Collect();

			DX.ScreenFlip();

			if (DX.CheckHitKey(DX.KEY_INPUT_ESCAPE) == 1 || DX.ProcessMessage() == -1)
			{
				throw new Exception("ゲーム中断");
			}
		}
	}
}
