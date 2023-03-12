/*
	�V�i���I - �X�e�[�W 03 �{�X
*/

function* <generatorForTask> Scenario_Stage03Boss()
{
	for (var<Enemy_t> enemy of GetEnemies())
	{
		KillEnemy(enemy);
	}

	Play(M_Stage03Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss03(Screen_W / 2.0, -100.0, 300));

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
