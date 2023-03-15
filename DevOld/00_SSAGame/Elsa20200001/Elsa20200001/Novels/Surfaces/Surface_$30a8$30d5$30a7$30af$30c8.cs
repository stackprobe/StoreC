﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;

namespace Charlotte.Novels.Surfaces
{
	public class Surface_エフェクト : Surface
	{
		public Surface_エフェクト(string typeName, string instanceName)
			: base(typeName, instanceName)
		{
			this.Z = 50000;
		}

		private DDTaskList EL = new DDTaskList();

		public override IEnumerable<bool> E_Draw()
		{
			for (; ; )
			{
				this.EL.ExecuteAllTask();

				yield return true;
			}
		}

		protected override void Invoke_02(string command, params string[] arguments)
		{
			int c = 0;

			if (command == "追加")
			{
				string name = arguments[c++];
				string[] effArgs = arguments.Skip(c).ToArray();

				this.EL.Add(SCommon.Supplier(this.GetEffect(name, effArgs)));
				return;
			}
			ProcMain.WriteLog(command);
			throw new DDError(); // Bad command
		}

		private IEnumerable<bool> GetEffect(string name, string[] arguments)
		{
			switch (name)
			{
				// 形式：
				//case "effect-name": return E_EffectTask();

				default:
					throw null; // never
			}
		}
	}
}
