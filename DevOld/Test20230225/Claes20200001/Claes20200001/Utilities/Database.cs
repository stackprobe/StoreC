using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using System.IO;

namespace Charlotte.Utilities
{
	public class Database
	{
		/// <summary>
		/// エスキューライトの実行ファイルのフルパス
		/// ★空白を含まないこと。
		/// </summary>
		private const string SqliteProgram = @"C:\Berry\app\sqlite-tools-win32-x86-3410000\sqlite3.exe";

		/// <summary>
		/// データベースのファイル名
		/// ★アスキー文字のみであること。
		/// ★空白を含まないこと。
		/// </summary>
		private const string DBFileName = "DB";

		// ----

		public string DBDir;

		public Database(string dbDir)
		{
			this.DBDir = SCommon.MakeFullPath(dbDir);

			SCommon.CreateDir(this.DBDir);
		}

		public void Execute(string query, Action<string> resultFileReaction)
		{
			using (WorkingDir wd = new WorkingDir())
			{
				string queryFile = wd.MakePath();
				string resultFile = wd.MakePath();

				File.WriteAllText(queryFile, query, Encoding.ASCII);

				SCommon.Batch(
					new string[]
					{
						SqliteProgram + " " + DBFileName + " < \"" + queryFile + "\" > \"" + resultFile + "\"",
						//"PAUSE",
					},
					this.DBDir
					//, SCommon.StartProcessWindowStyle_e.NORMAL
					);

				resultFileReaction(resultFile);
			}
		}
	}
}
