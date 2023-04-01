using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.IO;
using System.Drawing;
using System.Windows.Forms;
using DxLibDLL;
using Charlotte.Commons;

namespace Charlotte.GameCommons
{
	public class GameProcMain
	{
		public static List<Action> Finalizers = new List<Action>();

		public static void GameMain(Form mainForm)
		{
			Thread th = new Thread(() =>
			{
				bool aliving = true;

				Main2(() =>
				{
					mainForm.BeginInvoke((MethodInvoker)delegate
					{
						if (aliving)
							mainForm.Visible = false;
					});
				});

				mainForm.BeginInvoke((MethodInvoker)delegate
				{
					aliving = false;
					mainForm.Close();
				});
			});

			th.Start();
		}

		private static void Main2(Action gameStarted)
		{
			try
			{
				Main3(gameStarted);
			}
			catch (Exception e)
			{
				ProcMain.WriteLog(e);
			}
			finally
			{
				while (1 <= Finalizers.Count)
				{
					try
					{
						SCommon.UnaddElement(Finalizers)();
					}
					catch (Exception ex)
					{
						ProcMain.WriteLog(ex);
					}
				}
			}
		}

		private static void Main3(Action gameStarted)
		{
			ProcMain.WriteLog = message =>
			{
				File.AppendAllLines(
					@"C:\temp\Game.log",
					new string[] { "[" + DateTime.Now + "] " + message },
					Encoding.UTF8
					);
			};

			Icon icon;

			using (MemoryStream mem = new MemoryStream(DD.GetResFileData(@"General\app.ico")))
			{
				icon = new Icon(mem);
			}

			DX.SetApplicationLogSaveDirectory(@"C:\temp");
			DX.SetOutApplicationLogValidFlag(1); // ログを出力/1:する/0:しない
			DX.SetAlwaysRunFlag(1); // 非アクティブ時に/1:動く/0:止まる
			DX.SetMainWindowText("Elsa20230401");
			DX.SetGraphMode(800, 600, 32);
			DX.ChangeWindowMode(1); // 1:ウィンドウ/0:フルスクリーン
			DX.SetWindowIconHandle(icon.Handle);

			if (DX.DxLib_Init() != 0) // ? 失敗
				throw null;

			Finalizers.Add(() =>
			{
				if (DX.DxLib_End() != 0) // ? 失敗
					throw null;
			});

			DX.SetWindowSizeChangeEnableFlag(0); // ウィンドウの右下をドラッグでサイズ変更/1:する/0:しない
			DX.SetMouseDispFlag(0); // マウスカーソルを表示/1:する/0:しない
			DX.SetDrawMode(DX.DX_DRAWMODE_ANISOTROPIC);

			gameStarted();

			Program2.GameMain(); // TODO
		}
	}
}
