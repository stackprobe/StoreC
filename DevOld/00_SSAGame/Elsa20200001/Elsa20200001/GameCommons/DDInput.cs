﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.GameCommons
{
	public static class DDInput
	{
		public class Button
		{
			public int BtnId = -1; // -1 == 未割り当て
			public int KeyId = -1; // -1 == 未割り当て

			// <---- prm

			private bool FreezeInputUntilReleaseFlag = false;
			public int Status = 0;

			// ★★★ ボタン・キー押下は 1 マウス押下は -1 で判定する。
			//
			public int GetInput()
			{
				if (this.FreezeInputUntilReleaseFlag)
				{
					if (this.Status != 0)
						return 0;

					this.FreezeInputUntilReleaseFlag = false;
				}
				return 1 <= DDEngine.FreezeInputFrame ? 0 : this.Status;
			}

			public bool IsPound()
			{
				return DDUtils.IsPound(this.GetInput());
			}

			public void FreezeInputUntilRelease()
			{
				this.FreezeInputUntilReleaseFlag = true;
			}

			private int[] BackupData = null;

			public void Backup()
			{
				this.BackupData = new int[] { this.BtnId, this.KeyId };
			}

			public void Restore()
			{
				int c = 0;

				this.BtnId = this.BackupData[c++];
				this.KeyId = this.BackupData[c++];

				this.BackupData = null;
			}
		}

		// ボタンの初期化 --> DDGround.INIT()
		// ボタンの保存・読み込み --> DDSaveData.Save(), DDSaveData.Load()
		// ボタンの設定 --> SimpleMenu.PadConfig()

		public static Button DIR_2 = new Button();
		public static Button DIR_4 = new Button();
		public static Button DIR_6 = new Button();
		public static Button DIR_8 = new Button();
		public static Button A = new Button();
		public static Button B = new Button();
		public static Button C = new Button();
		public static Button D = new Button();
		public static Button E = new Button();
		public static Button F = new Button();
		public static Button L = new Button();
		public static Button R = new Button();
		public static Button PAUSE = new Button();
		public static Button START = new Button();

		private static void MixInput(Button button, bool oppositeInput = false)
		{
			bool keyDown = button.KeyId != -1 && 1 <= DDKey.GetInput(button.KeyId);
			bool btnDown = button.BtnId != -1 && 1 <= DDPad.GetInput(DDGround.PrimaryPadId, button.BtnId);

			DDUtils.UpdateInput(ref button.Status, !oppositeInput && (keyDown || btnDown));
		}

		public static void EachFrame()
		{
			int freezeInputFrame_BKUP = DDEngine.FreezeInputFrame;
			DDEngine.FreezeInputFrame = 0;

			MixInput(DIR_2);
			MixInput(DIR_4);
			MixInput(DIR_6, 1 <= DIR_4.Status);
			MixInput(DIR_8, 1 <= DIR_2.Status);
			MixInput(A);
			MixInput(B);
			MixInput(C);
			MixInput(D);
			MixInput(E);
			MixInput(F);
			MixInput(L);
			MixInput(R);
			MixInput(PAUSE);
			MixInput(START);

			DDEngine.FreezeInputFrame = freezeInputFrame_BKUP;
		}
	}
}
