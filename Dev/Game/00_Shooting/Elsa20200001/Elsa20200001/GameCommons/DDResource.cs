﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.GameCommons
{
	public static class DDResource
	{
		private static WorkingDir WD = new WorkingDir();

		private static bool ReleaseMode = false;
		private static string ResourceDir;

		private class ResInfo
		{
			public string ResFile;
			public long Offset;
			public int Size;
			public string CachedFile;
		}

		private static Dictionary<string, ResInfo> File2ResInfo = SCommon.CreateDictionaryIgnoreCase<ResInfo>();

		public static void INIT()
		{
			if (File.Exists(DDConsts.ResourceFile)) // ? 外部リリース
			{
				ReleaseMode = true;
			}
			else if (Directory.Exists(DDConsts.ResourceDir_InternalRelease)) // ? 内部リリース
			{
				ResourceDir = DDConsts.ResourceDir_InternalRelease;
			}
			else // ? 開発環境
			{
				ResourceDir = DDConsts.ResourceDir_DevEnv;
			}

			if (ReleaseMode)
			{
				List<ResInfo> resInfos = new List<ResInfo>();

				using (FileStream reader = new FileStream(DDConsts.ResourceFile, FileMode.Open, FileAccess.Read))
				{
					while (reader.Position < reader.Length)
					{
						int size = SCommon.ToInt(SCommon.Read(reader, 4));

						if (size < 0)
							throw new DDError();

						resInfos.Add(new ResInfo()
						{
							ResFile = DDConsts.ResourceFile,
							Offset = reader.Position,
							Size = size,
						});

						reader.Seek((long)size, SeekOrigin.Current);
					}
				}
				string[] files = SCommon.TextToLines(SCommon.ENCODING_SJIS.GetString(LoadFile(resInfos[0])));

				if (files.Length != resInfos.Count)
					throw new DDError(files.Length + ", " + resInfos.Count);

				for (int index = 1; index < files.Length; index++)
				{
					string file = files[index];

					if (File2ResInfo.ContainsKey(file))
						throw new DDError(file);

					File2ResInfo.Add(file, resInfos[index]);
				}
			}
		}

		private static byte[] LoadFile(string resFile, long offset, int size)
		{
			using (FileStream reader = new FileStream(resFile, FileMode.Open, FileAccess.Read))
			{
				reader.Seek(offset, SeekOrigin.Begin);

				return DDJammer.Decode(SCommon.Read(reader, size));
			}
		}

		private static void LiteMaskCachedFileData(byte[] fileData)
		{
			int size = Math.Min(30, fileData.Length);

			for (int index = 0; index < size; index++)
			{
				fileData[index] ^= 0xa5;
			}
		}

		private static long CachedFileCounter = 0L;

		private static byte[] LoadFile(ResInfo resInfo)
		{
			byte[] fileData;

			if (resInfo.CachedFile == null)
			{
				fileData = LoadFile(resInfo.ResFile, resInfo.Offset, resInfo.Size);

#if true
				{
					Func<string> a_makeLocalName = () => "$" + SCommon.CRandom.GetRange(1, 3);
					string dir = Path.Combine(WD.GetPath(a_makeLocalName()), a_makeLocalName(), a_makeLocalName(), a_makeLocalName());
					SCommon.CreateDir(dir);
					resInfo.CachedFile = Path.Combine(dir, "$" + CachedFileCounter++);
				}
#else // シンプル
				resInfo.CachedFile = WD.MakePath();
#endif

				LiteMaskCachedFileData(fileData);
				File.WriteAllBytes(resInfo.CachedFile, fileData);
			}
			else
			{
				fileData = File.ReadAllBytes(resInfo.CachedFile);
			}
			LiteMaskCachedFileData(fileData);
			return fileData;
		}

		public static byte[] Load(string file)
		{
			if (ReleaseMode)
			{
				file = file.Replace('/', '\\');

				return LoadFile(File2ResInfo[file]);
			}
			else
			{
				string datFile = Path.Combine(ResourceDir, file);

				if (!File.Exists(datFile))
					throw new Exception(datFile);

				return File.ReadAllBytes(datFile);
			}
		}

		public static void Save(string file, byte[] fileData)
		{
			if (ReleaseMode)
			{
				throw new DDError();
			}
			else
			{
				File.WriteAllBytes(Path.Combine(ResourceDir, file), fileData);
			}
		}

		/// <summary>
		/// ファイルリストを取得する。
		/// ソート済み
		/// '_' で始まるファイルの除去済み
		/// </summary>
		/// <returns>ファイルリスト</returns>
		public static IEnumerable<string> GetFiles()
		{
			IEnumerable<string> files;

			if (ReleaseMode)
			{
				files = File2ResInfo.Keys;
			}
			else
			{
				files = Directory.GetFiles(ResourceDir, "*", SearchOption.AllDirectories).Select(file => SCommon.ChangeRoot(file, ResourceDir));

				// '_' で始まるファイルの除去
				// makeDDResourceFile は '_' で始まるファイルを含めない。
				files = files.Where(file => Path.GetFileName(file)[0] != '_');
			}

			// ソート
			// makeDDResourceFile はファイルリストを sortJLinesICase している。
			// ここでソートする必要は無いが、戻り値に統一性を持たせるため(毎回ファイルの並びが違うということのないように)ソートしておく。
			files = files.OrderBy(SCommon.CompIgnoreCase);

			return files;
		}
	}
}
