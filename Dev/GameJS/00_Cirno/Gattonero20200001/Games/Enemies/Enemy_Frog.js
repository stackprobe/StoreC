/*
	�G - Frog
*/

var<int> EnemyKind_Frog = @(AUTO);

function <Enemy_t> CreateEnemy_Frog(<double> x, <double> y)
{
	var ret =
	{
		Kind: EnemyKind_Frog,
		X: x,
		Y: y,
		HP: 5,
		AttackPoint: 1,
		HitDie: false,
		Crash: null,

		// ��������ŗL
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<double> SPEED = 3.0;
	var<double> JUMP_SPEED = -6.0;
	var<double> HI_JUMP_SPEED = -12.0;
	var<double> GRAVITY = 0.5;

	var<double> ATARI_X = 25.0; // �����蔻��E���X�p��
	var<double> ATARI_Y = 25.0; // �����蔻��E�c�X�p��

	for (; ; )
	{
		if (IsPtWall_XY(enemy.X, enemy.Y + ATARI_Y)) // �n�ʂւ̂߂荞�݂�����
		{
			enemy.Y = ToTileCenterY(enemy.Y + ATARI_Y) - TILE_H / 2.0 - ATARI_Y;
		}

		var<int> stayFrame;

		if (GetRand1() < 0.3) // ? �Z����
		{
			stayFrame = 30;
		}
		else // ? ������
		{
			stayFrame = 100;
		}

		for (var<Scene_t> scene of CreateScene(stayFrame))
		{
			@@_DrawCommon(enemy);
			yield 1;
		}

		var<double> xSpeed;
		var<double> ySpeed;

		if (PlayerX < enemy.X)
		{
			xSpeed = -SPEED;
		}
		else
		{
			xSpeed = SPEED;
		}

		if (GetRand1() < 0.6) // ? ���W�����v
		{
			ySpeed = JUMP_SPEED;
		}
		else // ? ��W�����v
		{
			ySpeed = HI_JUMP_SPEED;
		}

		for (; ; )
		{
			ySpeed += GRAVITY;

			enemy.X += xSpeed;
			enemy.Y += ySpeed;

			if (IsPtWall_XY(enemy.X - ATARI_X, enemy.Y))
			{
				xSpeed = SPEED;
			}
			if (IsPtWall_XY(enemy.X + ATARI_X, enemy.Y))
			{
				xSpeed = -SPEED;
			}
			if (IsPtWall_XY(enemy.X, enemy.Y - ATARI_Y))
			{
				ySpeed = Math.max(0.0, ySpeed);
			}
			if (IsPtWall_XY(enemy.X, enemy.Y + ATARI_Y))
			{
				break;
			}

			@@_DrawCommon(enemy);
			yield 1;
		}
	}
}

function <void> @@_DrawCommon(<Enemy_t> enemy)
{
	enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 50.0, 50.0));

	Draw(P_Enemy_Frog, enemy.X - Camera.X, enemy.Y - Camera.Y, 1.0, 0.0, 1.0);
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy, <boolean> destroyed)
{
	EnemyCommon_Dead(enemy, destroyed);
}
