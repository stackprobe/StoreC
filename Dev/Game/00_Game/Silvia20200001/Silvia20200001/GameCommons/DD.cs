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
				string clusterFile = Path.Combine(ProcMain.SelfDir, "Resource.dat");

				if (File.Exists(clusterFile))
				{
					ResourceCluster rc = new ResourceCluster(clusterFile);
					PF_GetResFileData = fp => rc.GetFileData(fp);
				}
				else
				{
					PF_GetResFileData = fp => File.ReadAllBytes(Path.Combine(@"..\..\..\..\Resource", fp));
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
