/*
	�G - �X�^�[�g�n�_
*/

var<int> EnemyKind_Start = @(AUTO);

function <Enemy_t> CreateEnemy_Start(<double> x, <double> y)
{
	var ret =
	{
		Kind: EnemyKind_Start,
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
	for (; ; )
	{
		enemy.Crash = null; // �����蔻�薳��

		// �`�斳��

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// none
}

function <void> @@_Dead(<Enemy_t> enemy, <Shot_t> shot)
{
	// none
}
