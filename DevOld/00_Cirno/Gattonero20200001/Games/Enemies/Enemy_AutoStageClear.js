/*
	�G - AutoStageClear
*/

var<int> EnemyKind_AutoStageClear = @(AUTO);

function <Enemy_t> CreateEnemy_AutoStageClear(<double> x, <double> y)
{
	var ret =
	{
		Kind: EnemyKind_AutoStageClear,
		X: x,
		Y: y,
		HP: 0,
		AttackPoint: 0,
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
	AddTask(GameTasks, @@_BackgroundTask());

	for (; ; )
	{
		enemy.Crash = null; // �����蔻�薳���B

		// �`�斳���B

		yield 1;
	}
}

function* <generatorForTask> @@_BackgroundTask()
{
	yield* Wait(30); // �X�e�[�W�J�n���ォ�画��n�߂�Ɖ������邩������Ȃ��̂ŁA�����҂��Ă���J�n����B

	while (GetEnemies().some(v => IsEnemyBoss(v)))
	{
		yield 1;
	}

	yield* Wait(30); // �]�C

	Fadeout_F(100);

	yield* Wait(150); // �]�C

	GameRequestStageClear = true;
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// noop
}

function <void> @@_Dead(<Enemy_t> enemy, <Shot_t> shot)
{
	// noop
}
