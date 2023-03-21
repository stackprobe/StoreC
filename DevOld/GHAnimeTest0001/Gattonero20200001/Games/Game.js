/*
	ゲーム・メイン
*/

// カメラ位置(整数)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// ゲーム用タスク
var<TaskManager_t> GameTasks = CreateTaskManager();

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

//	var<Actor_t> card = CreateActor_Trump(Screen_W + 300, -300, 1, 1, false);
//	SetTrumpDest(card, Screen_W / 2.0, Screen_H / 2.0);
//	AddActor(card);

	var<string> BACK_COLOR = "#ffe0d0";

	for (; ; )
	{
		for (; ; )
		{
			if (GetMouseDown() == -1)
			{
				break;
			}

			SetColor(BACK_COLOR);
			PrintRect(0, 0, Screen_W, Screen_H);
			Draw(P_Face_01, Screen_W / 2, 400, 1.0, 0.0, 1.0);
			Draw(P_Wiener,  Screen_W / 2, 400, 1.0, 0.0, 1.0);

			yield 1;
		}
		FreezeInput();

		{
			// Wiener位置
			var<double> wienerX = Screen_W / 2;
			var<double> wienerY = 400;

			// Wiener回転軸			
			var<double> rotCtrX = 0.0;
			var<double> rotCtrY = 400.0;

			var<double> rot = 0.0;

			var<Func double> getNextRot = Supplier(@@_IterateRot());

			for (; ; )
			{
				if (GetMouseDown() == -1)
				{
					break;
				}

				SetColor(BACK_COLOR);
				PrintRect(0, 0, Screen_W, Screen_H);
				Draw(P_Face_01, Screen_W / 2, 400, 1.0, 0.0, 1.0);

				rot = getNextRot();

				var<double> rx = wienerX - rotCtrX; // Wiener相対(回転軸⇒描画位置)_X
				var<double> ry = wienerY - rotCtrY; // Wiener相対(回転軸⇒描画位置)_Y
				var<double> r = GetAngle(rx, ry);
				var<double> d = GetDistance(rx, ry);

				r += rot; // Wiener回転適用

				var<D2Point_t> rPt = AngleToPoint(r, d); // 回転を適用したWiener描画相対位置
				rx = rPt.X;
				ry = rPt.Y;

				var<double> x = rotCtrX + rx; // Wiener描画位置_X
				var<double> y = rotCtrY + ry; // Wiener描画位置_Y

				Draw(P_Wiener, x, y, 1.0, rot, 1.0);

				yield 1;
			}
		}
		FreezeInput();

		{
			var<double> f1x = Screen_W / 2;
			var<double> f1y = 400;
			var<double> f2x = 450;
			var<double> f2y = 400;

			for (var<Scene_t> scene of CreateScene(20))
			{
				if (GetMouseDown() == -1)
				{
					break;
				}

				var<double> a1 = Parabola(scene.Rate * 0.5 + 0.5);
				var<double> a2 = Parabola(scene.Rate * 0.5 + 0.0);

				SetColor(BACK_COLOR);
				PrintRect(0, 0, Screen_W, Screen_H);
				Draw(P_Face_01, f1x, f1y, a1, 0.0, 1.0);
				Draw(P_Face_02_Back, f2x, f2y, a2, 0.0, 1.0);
				Draw(P_Face_02_Fore, f2x, f2y, a2, 0.0, 1.0);
				Draw(P_Wiener, Screen_W / 2, 400, 1.0, 0.0, 1.0);

				yield 1;
			}
		}
		FreezeInput();

		{
			var<double> fx = 450;
			var<double> fy = 400;

			var<Func double> getNextFaceRX = Supplier(@@_IterateFaceRX());

			for (; ; )
			{
				if (GetMouseDown() == -1)
				{
					break;
				}

				var<double> x = fx + getNextFaceRX();
				var<double> y = fy;

				SetColor(BACK_COLOR);
				PrintRect(0, 0, Screen_W, Screen_H);
				Draw(P_Face_02_Back, x, y, 1.0, 0.0, 1.0);
				Draw(P_Wiener, Screen_W / 2, 400, 1.0, 0.0, 1.0);
				Draw(P_Face_02_Fore, x, y, 1.0, 0.0, 1.0);

				yield 1;
			}
		}
		FreezeInput();
	}

	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);
}

function* <double[]> @@_IterateRot()
{
	var<double> ROT_END = -0.2;

	for (var<int> c = 0; c < 3; c++)
	{
		for (var<Scene_t> scene of CreateScene(10))
		{
			yield ROT_END * scene.Rate;
		}
		for (var<Scene_t> scene of CreateScene(20))
		{
			yield ROT_END * scene.RemRate;
		}
	}
	for (; ; )
	{
		yield 0.0;
	}
}

function* <double[]> @@_IterateFaceRX()
{
	var<double> X_L = -200.0;
	var<double> X_R = -150.0;

	for (var<Scene_t> scene of CreateScene(60))
	{
		yield scene.Rate * X_L;
	}
	for (; ; )
	{
		for (var<Scene_t> scene of CreateScene(10))
		{
			yield AToBRate(X_L, X_R, scene.Rate);
		}
		for (var<Scene_t> scene of CreateScene(20))
		{
			yield AToBRate(X_R, X_L, scene.Rate);
		}
	}
}
