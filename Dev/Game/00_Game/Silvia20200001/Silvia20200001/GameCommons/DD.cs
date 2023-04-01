using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using DxLibDLL;

namespace Charlotte.GameCommons
{
	/// <summary>
	/// ゲームに関する共通機能・便利機能はできるだけこのクラスに集約する。
	/// </summary>
	public static class DD
	{
		public static byte[] GetResFileData(string filePath)
		{
			return File.ReadAllBytes(Path.Combine(@"..\..\..\..\Resource", filePath));
		}

		public static void EachFrame()
		{
			DX.ScreenFlip();

			if (DX.CheckHitKey(DX.KEY_INPUT_ESCAPE) == 1 || DX.ProcessMessage() == -1)
			{
				throw new Exception("ゲーム中断");
			}
		}
	}
}
