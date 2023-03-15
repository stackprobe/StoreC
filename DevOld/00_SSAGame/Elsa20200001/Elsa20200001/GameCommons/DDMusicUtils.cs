﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.GameCommons
{
	public static class DDMusicUtils
	{
		public static List<DDMusic> Musics = new List<DDMusic>();

		public static void Add(DDMusic music)
		{
			Musics.Add(music);
		}

		private class PlayInfo
		{
			public enum Command_e
			{
				PLAY = 1,
				VOLUME_RATE,
				STOP,
			}

			public Command_e Command;
			public DDMusic Music;
			public bool Once;
			public bool Resume;
			public double VolumeRate;

			public PlayInfo(Command_e command, DDMusic music, bool once, bool resume, double volumeRate)
			{
				this.Command = command;
				this.Music = music;
				this.Once = once;
				this.Resume = resume;
				this.VolumeRate = volumeRate;
			}
		}

		private static Queue<PlayInfo> PlayInfos = new Queue<PlayInfo>();

		public static void EachFrame()
		{
			if (1 <= PlayInfos.Count)
			{
				PlayInfo info = PlayInfos.Dequeue();

				if (info != null)
				{
					switch (info.Command)
					{
						case PlayInfo.Command_e.PLAY:
							DDSoundUtils.Play(info.Music.Sound.GetHandle(0), info.Once, info.Resume);
							break;

						case PlayInfo.Command_e.VOLUME_RATE:
							DDSoundUtils.SetVolume(info.Music.Sound.GetHandle(0), DDSoundUtils.MixVolume(DDGround.MusicVolume, info.Music.Volume) * info.VolumeRate);
							break;

						case PlayInfo.Command_e.STOP:
							DDSoundUtils.Stop(info.Music.Sound.GetHandle(0));
							break;

						default:
							throw new DDError();
					}
				}
			}
		}

		private static DDMusic CurrDestMusic = null;
		private static bool CurrDestOnce = false;
		private static double CurrDestVolume = 0.0;

		public static void Play(DDMusic music, bool once = false, bool resume = false, double volume = 1.0, int fadeFrameMax = 30)
		{
			if (CurrDestMusic != null) // ? 再生中
			{
				if (CurrDestMusic == music)
					return;

				if (1 <= fadeFrameMax)
					Fadeout(fadeFrameMax);
				else
					Stop();
			}
			PlayInfos.Enqueue(new PlayInfo(PlayInfo.Command_e.PLAY, music, once, resume, 0.0));
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(new PlayInfo(PlayInfo.Command_e.VOLUME_RATE, music, false, false, volume));
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);

			CurrDestMusic = music;
			CurrDestOnce = once;
			CurrDestVolume = volume;
		}

		public static void Fadeout(int frameMax = 30)
		{
			Fade(frameMax, 0.0);
		}

		public static void Fade(int frameMax, double destVolumeRate)
		{
			Fade(frameMax, destVolumeRate, CurrDestVolume);
		}

		public static void Fade(int frameMax, double destVolumeRate, double startVolumeRate)
		{
			if (CurrDestMusic == null)
				return;

			for (int frmcnt = 0; frmcnt <= frameMax; frmcnt++)
			{
				double volumeRate;

				if (frmcnt == 0)
					volumeRate = startVolumeRate;
				else if (frmcnt == frameMax)
					volumeRate = destVolumeRate;
				else
					volumeRate = startVolumeRate + ((destVolumeRate - startVolumeRate) * frmcnt) / frameMax;

				PlayInfos.Enqueue(new PlayInfo(PlayInfo.Command_e.VOLUME_RATE, CurrDestMusic, false, false, volumeRate));
			}
			CurrDestVolume = destVolumeRate;

			if (destVolumeRate == 0.0) // ? フェード目標音量ゼロ -> 曲停止
			{
				Stop();
			}
		}

		public static void Stop()
		{
			if (CurrDestMusic == null)
				return;

			PlayInfos.Enqueue(new PlayInfo(PlayInfo.Command_e.VOLUME_RATE, CurrDestMusic, false, false, 0.0));
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(new PlayInfo(PlayInfo.Command_e.STOP, CurrDestMusic, false, false, 0.0));
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);
			PlayInfos.Enqueue(null);

			CurrDestMusic = null;
			CurrDestOnce = false;
			CurrDestVolume = 0.0;
		}

		private static DDMusic CurrPauseMusic = null;
		private static bool CurrPauseOnce = false;
		private static double CurrPauseVolume = 0.0;

		public static void Pause()
		{
			CurrPauseMusic = CurrDestMusic;
			CurrPauseOnce = CurrDestOnce;
			CurrPauseVolume = CurrDestVolume;

			Stop();
		}

		public static void Resume()
		{
			if (CurrPauseMusic != null)
				CurrPauseMusic.Play(CurrPauseOnce, true, CurrPauseVolume);
		}

		public static void UpdateVolume()
		{
			Fade(0, 1.0);
		}

		/// <summary>
		/// クリア対象の音楽は停止していること。
		/// -- 再生中に Unload したらマズいのかどうかは不明。多分マズいだろう。
		/// </summary>
		public static void UnloadAll()
		{
			foreach (DDMusic music in Musics)
				music.Sound.Unload();
		}

		/// <summary>
		/// クリア対象の音楽は停止していること。
		/// -- 再生中に Unload したらマズいのかどうかは不明。多分マズいだろう。
		/// </summary>
		public static void UnloadLocally()
		{
			UnloadLocally(music => true);
		}

		public static void UnloadLocally(Predicate<DDMusic> match)
		{
			foreach (DDMusic music in Musics)
				if (music.Locally && match(music))
					music.Sound.Unload();
		}

		public static void TouchGlobally()
		{
			foreach (DDMusic music in Musics)
				if (music.Globally)
					music.Sound.GetHandle(0);
		}
	}
}
