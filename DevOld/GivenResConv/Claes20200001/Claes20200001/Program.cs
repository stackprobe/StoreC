using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using Charlotte.Commons;
using Charlotte.Tests;
using Charlotte.Utilities;

namespace Charlotte
{
	class Program
	{
		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2);
		}

		private void Main2(ArgsReader ar)
		{
			if (ProcMain.DEBUG)
			{
				Main3();
			}
			else
			{
				Main4(ar);
			}
			SCommon.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			//Main4(new ArgsReader(new string[] { @"C:\temp\riulril_action_game" }));
			Main4(new ArgsReader(new string[] { @"C:\temp\riulril_action_game", @"C:\temp\out" }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			SCommon.Pause();
		}

		private void Main4(ArgsReader ar)
		{
			try
			{
				Main5(ar);
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				MessageBox.Show("" + ex, Path.GetFileNameWithoutExtension(ProcMain.SelfFile) + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private void Main5(ArgsReader ar)
		{
			// ---- 引数読み込み_引数チェック

			string inputDir = SCommon.MakeFullPath(ar.NextArg());
			string outputDir;

			if (!Directory.Exists(inputDir))
				throw new Exception("no inputDir");

			if (ar.HasArgs())
			{
				outputDir = SCommon.MakeFullPath(ar.NextArg());

				ar.End();

				SCommon.DeletePath(outputDir);
				SCommon.CreateDir(outputDir);
			}
			else
			{
				ar.End();

				outputDir = Path.Combine(SCommon.GetOutputDir(), "res");
			}

			// ---- 実行前チェック

			if (!File.Exists(Consts.FFMPEG_EXE))
				throw new Exception("no FFMPEG_EXE");

			// ----

			ProcMain.WriteLog("< " + inputDir);
			ProcMain.WriteLog("> " + outputDir);
			ProcMain.WriteLog("start");

			SCommon.CopyDir(inputDir, outputDir);

			ConvertMain(outputDir);

			ProcMain.WriteLog("done!");
		}

		private void ConvertMain(string targetDir)
		{
			foreach (string file in Common.GetAllFile(targetDir))
			{
				string name = Path.GetFileNameWithoutExtension(file);

				if (Regex.IsMatch(name, "^[0-9]{1,3}$"))
				{
					string fileNew = Path.Combine(SCommon.ToParentPath(file), int.Parse(name).ToString("D4") + Path.GetExtension(file));

					ProcMain.WriteLog("< " + file);
					ProcMain.WriteLog("> " + fileNew);

					if (Common.ExistsPath(fileNew))
						throw new Exception("Dupl-Path: " + fileNew);

					File.Move(file, fileNew);

					ProcMain.WriteLog("done");
				}
			}
			foreach (string file in Common.GetAllFile(targetDir))
			{
				string ext = Path.GetExtension(file).ToLower();

				if (
					ext == ".bmp" ||
					ext == ".jpg" ||
					ext == ".jpeg"
					)
				{
					string fileNew = SCommon.ChangeExt(file, ".png");

					ProcMain.WriteLog("< " + file);
					ProcMain.WriteLog("> " + fileNew);

					if (Common.ExistsPath(fileNew))
						throw new Exception("Dupl-Path: " + fileNew);

					Canvas.LoadFromFile(file).Save(fileNew);
					SCommon.DeletePath(file);

					ProcMain.WriteLog("done");
				}
			}
			foreach (string file in Common.GetAllFile(targetDir))
			{
				string ext = Path.GetExtension(file).ToLower();

				if (ext == ".gif")
				{
					ConvertGifPictureToPngPictures(file);
				}
			}
			foreach (string file in Common.GetAllFile(targetDir))
			{
				string ext = Path.GetExtension(file).ToLower();

				if (ext == ".png")
				{
					ConvertPicture(file);
				}
			}
			foreach (string file in Common.GetAllFile(targetDir))
			{
				string ext = Path.GetExtension(file).ToLower();

				if (ext == ".ogg")
				{
					ConvertSound(file);
				}
			}
		}

		private void ConvertGifPictureToPngPictures(string inputFile)
		{
			string outputDir = SCommon.ChangeExt(inputFile, "");

			ProcMain.WriteLog("< " + inputFile);
			ProcMain.WriteLog("> " + outputDir);

			if (Common.ExistsPath(outputDir))
				throw new Exception("Dupl-Path: " + outputDir);

			using (WorkingDir wd = new WorkingDir())
			{
				string rFile = wd.GetPath("input.gif");
				string wDir = wd.GetPath("out");

				File.Copy(inputFile, rFile);
				SCommon.CreateDir(wDir);

				SCommon.Batch(
					new string[]
					{
						Consts.FFMPEG_EXE + " -i input.gif -vcodec png out\\%%04d.png" 
					},
					wd.GetPath(".")
					);

				if (Directory.GetFiles(wDir).Length < 1)
					throw new Exception("FFMPEG Fault");

				SCommon.CopyDir(wDir, outputDir);
			}
			SCommon.DeletePath(inputFile);

			ProcMain.WriteLog("done");
		}

		private void ConvertPicture(string file)
		{
			ProcMain.WriteLog("* " + file);

			Canvas canvas = Canvas.LoadFromFile(file);
			bool changed = false;

			if (canvas.W % 2 == 1)
			{
				Canvas dest = new Canvas(canvas.W + 1, canvas.H);

				dest.Fill(new I4Color(0, 0, 0, 0));
				dest.DrawImage(canvas, 0, 0, false);

				canvas = dest;
				changed = true;
			}
			if (canvas.H % 2 == 1)
			{
				Canvas dest = new Canvas(canvas.W, canvas.H + 1);

				dest.Fill(new I4Color(0, 0, 0, 0));
				dest.DrawImage(canvas, 0, 0, false);

				canvas = dest;
				changed = true;
			}

			if (changed)
				canvas.Save(file);

			ProcMain.WriteLog("done");
		}

		private void ConvertSound(string inputFile)
		{
			string outputFile = SCommon.ChangeExt(inputFile, ".mp3");

			ProcMain.WriteLog("< " + inputFile);
			ProcMain.WriteLog("> " + outputFile);

			if (Common.ExistsPath(outputFile))
				throw new Exception("出力ファイルの重複：" + outputFile);

			using (WorkingDir wd = new WorkingDir())
			{
				string rFile = wd.GetPath("input" + Path.GetExtension(inputFile));
				string wFile = wd.GetPath("output.mp3");

				File.Copy(inputFile, rFile);

				SCommon.Batch(
					new string[]
					{
						Consts.FFMPEG_EXE + " -i " + Path.GetFileName(rFile) + " -ab 160k output.mp3"
					},
					wd.GetPath(".")
					);

				if (!File.Exists(wd.GetPath(wFile)))
					throw new Exception("FFMPEG Fault");

				File.Copy(wFile, outputFile);
			}
			SCommon.DeletePath(inputFile);

			ProcMain.WriteLog("done");
		}
	}
}
