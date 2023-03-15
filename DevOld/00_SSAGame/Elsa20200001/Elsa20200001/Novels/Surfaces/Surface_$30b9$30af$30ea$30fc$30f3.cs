﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;

namespace Charlotte.Novels.Surfaces
{
	public class Surface_スクリーン : Surface
	{
		public Surface_スクリーン(string typeName, string instanceName)
			: base(typeName, instanceName)
		{
			this.Z = 10000;
		}

		#region Layer

		private class LayerInfo
		{
			public string ImageFile;
			public double A = 1.0;
			public double SlideRate = 0.5;
			public double DestSlideRate = 0.5;

			// <---- prm

			public void Draw()
			{
				DDUtils.Approach(ref this.SlideRate, this.DestSlideRate, 0.9999);

				DDPicture picture = DDCCResource.GetPicture(this.ImageFile);

				DDDraw.SetAlpha(this.A);
				DDDraw.DrawRect(
					picture,
					DDUtils.AdjustRectExterior(picture.GetSize().ToD2Size(), new D4Rect(0, 0, DDConsts.Screen_W, DDConsts.Screen_H), 1.0 - this.SlideRate, 1.0 - this.SlideRate)
					);
				DDDraw.Reset();
			}
		}

		/// <summary>
		/// レイヤー配列
		/// 後の方を前面に表示する。
		/// 並びは以下の何れかしか無い：
		/// -- { }
		/// -- { 前面 }
		/// -- { 背面, 前面 }
		/// </summary>
		private List<LayerInfo> Layers = new List<LayerInfo>();

		private LayerInfo 前面
		{
			get
			{
				return this.Layers[this.Layers.Count - 1];
			}
		}

		private void Remove背面()
		{
			this.Layers = new List<LayerInfo>(new LayerInfo[] { this.前面 });
		}

		private void Remove前面()
		{
			this.Layers = new List<LayerInfo>(new LayerInfo[] { this.Layers[0] });
		}

		#endregion

		public override IEnumerable<bool> E_Draw()
		{
			for (; ; )
			{
				this.P_Draw();

				yield return true;
			}
		}

		private void P_Draw()
		{
			foreach (LayerInfo layer in this.Layers)
			{
				layer.Draw();
			}
		}

		protected override void Invoke_02(string command, params string[] arguments)
		{
			int c = 0;

			if (command == "画像")
			{
				this.Act.AddOnce(() => this.Layers.Add(new LayerInfo() { ImageFile = arguments[c++] }));
				return;
			}
			if (command == "スライド")
			{
				if (arguments.Length == 1)
				{
					this.Act.AddOnce(() => this.前面.DestSlideRate = double.Parse(arguments[c++]));
					return;
				}
				if (arguments.Length == 2)
				{
					this.Act.AddOnce(() =>
					{
						this.前面.SlideRate = double.Parse(arguments[c++]);
						this.前面.DestSlideRate = double.Parse(arguments[c++]);
					});

					return;
				}
				throw new DDError(); // Bad arguments
			}
			if (command == "画像フェードイン")
			{
				if (arguments.Length == 1)
				{
					this.Act.Add(SCommon.Supplier(this.画像フェードイン(() => new LayerInfo() { ImageFile = arguments[c++] })));
					return;
				}
				if (arguments.Length == 3)
				{
					this.Act.Add(SCommon.Supplier(this.画像フェードイン(() =>
					{
						LayerInfo layer = new LayerInfo();

						layer.ImageFile = arguments[c++];
						layer.SlideRate = double.Parse(arguments[c++]);
						layer.DestSlideRate = double.Parse(arguments[c++]);

						return layer;
					}
					)));

					return;
				}
				throw new DDError(); // Bad arguments
			}
			if (command == "フェードアウト")
			{
				this.Act.Add(SCommon.Supplier(this.フェードアウト()));
				return;
			}
			ProcMain.WriteLog(command);
			throw new DDError(); // Bad command
		}

		private IEnumerable<bool> 画像フェードイン(Func<LayerInfo> createLayer)
		{
			this.Layers.Add(createLayer());

			foreach (DDScene scene in DDSceneUtils.Create(60))
			{
				if (NovelAct.IsFlush)
				{
					this.前面.A = 1.0;
					this.Remove背面(); // 見えなくなった背面を除去
					yield break;
				}
				this.前面.A = scene.Rate;
				this.P_Draw();

				yield return true;
			}
			this.Remove背面(); // 見えなくなった背面を除去
		}

		private IEnumerable<bool> フェードアウト()
		{
			foreach (DDScene scene in DDSceneUtils.Create(60))
			{
				if (NovelAct.IsFlush)
				{
					this.Remove前面(); // フェードアウトした前面を除去
					yield break;
				}
				this.前面.A = 1.0 - scene.Rate;
				this.P_Draw();

				yield return true;
			}
			this.Remove前面(); // フェードアウトした前面を除去
		}
	}
}
