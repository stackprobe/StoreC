/*
	�G - FireBall
*/

var<int> EnemyKind_FireBall = @(AUTO);

function <Enemy_t> CreateEnemy_FireBall(<double> x, <double> y, <double> xAdd, <souble> yAdd)
{
	var ret =
	{
		Kind: EnemyKind_FireBall,
		X: x,
		Y: y,
		HP: 1,
		AttackPoint: 1,
		HitDie: true,
		Crash: null,

		// ��������ŗL

		<double> XAdd: xAdd,
		<double> YAdd: yAdd,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<int> bouncedCount = 0;

gameLoop:
	for (; ; )
	{
		enemy.YAdd += 0.3; // �d�͉����x

		enemy.YAdd = Math.min(enemy.YAdd, 8.0); // �����ō����x

		enemy.X += enemy.XAdd;
		enemy.Y += enemy.YAdd;

		var<double> R = 20.0;

		if (IsPtWall_XY(enemy.X - R, enemy.Y))
		{
			enemy.XAdd = Math.abs(enemy.XAdd);
		}
		if (IsPtWall_XY(enemy.X + R, enemy.Y))
		{
			enemy.XAdd = Math.abs(enemy.XAdd) * -1;
		}
		if (IsPtWall_XY(enemy.X, enemy.Y + R))
		{
			enemy.YAdd = Math.abs(enemy.YAdd) * -1;
			bouncedCount++;

			if (5 <= bouncedCount) // �o�E���h�񐔏��
			{
//				KillEnemy(enemy);
				AddEffect(Effect_Explode_M(enemy.X, enemy.Y));

				break gameLoop;
			}
		}

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, R);

		SetColor("#ff4040");
		PrintCircle(enemy.X - Camera.X, enemy.Y - Camera.Y, R);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy, <boolean> destroyed)
{
	EnemyCommon_Dead(enemy, destroyed);
}
