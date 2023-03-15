﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.GameCommons;

namespace Charlotte.Games.Walls
{
	public static class WallCatalog
	{
		public static Wall Create(string name)
		{
			Wall wall;

			switch (name)
			{
				case GameConsts.MAPPRM_DEFAULT_VALUE: wall = new Wall_Dark(); break;
				case "Dark": wall = new Wall_Dark(); break;
				//case "B0001": wall = new Wall_Simple(Ground.I.Picture.Wall_B0001); break;
				//case "B0002": wall = new Wall_Simple(Ground.I.Picture.Wall_B0002); break;
				//case "B0003": wall = new Wall_Simple(Ground.I.Picture.Wall_B0003); break;

				// 新しい壁紙をここへ追加..

				default:
					throw new DDError("name: " + name);
			}
			return wall;
		}
	}
}
