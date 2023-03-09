/*
	�V�i���I - �X�e�[�W 02 �{�X
*/

function* <generatorForTask> Scenario_Stage02Boss()
{
	for (var<Enemy_t> enemy of GetEnemies())
	{
		KillEnemy(enemy);
	}

	Play(M_Stage02Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss02(Screen_W / 2.0, -100.0, 300));

	for (; ; ) // �{�X�����ʂ܂ő҂B
	{
		if (!GetEnemies().some(v => IsEnemyBoss(v)))
		{
			break;
		}
		yield 1;
	}

	yield* Wait(90);
}
