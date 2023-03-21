/*
	�G���� - �G���G�̃A�C�e��������
*/

/*
	Enemy_t �ǉ��t�B�[���h
	{
		<EnemyItemType_e> @@_ItemType // �A�C�e���̎��
	}
*/

/*
	�G���G�̃A�C�e��������

	�g�p��F
		var<Enemy_t> enemy = EnemyCommon_ToItemer(CreateEnemy_XXX());
		----
		var<Enemy_t> enemy = CreateEnemy_XXX();
		EnemyCommon_ToItemer(enemy);
*/
function <Enemy_t> EnemyCommon_ToItemer(<Enemy_t> enemy, <EnemyItemType_e> itemType)
{
	enemy.@@_ItemType = itemType;

	AddTask(GameTasks, @@_Each(enemy));

	return enemy;
}

/*
	�^�X�N
*/
function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	for (var<int> frame = 0; ; frame++)
	{
		if (enemy.HP == -1) // ? ���Ɏ��S -> �I��
		{
			break;
		}

		yield 1;
	}

	@@_DropItem(enemy);
}

/*
	�A�C�e������_���s
*/
function <void> @@_DropItem(<Enemy_t> enemy)
{
	var<double> T_MGN = 100.0; // ��ʊO�E�㕔�}�[�W�� -- ��ʏ㕔�ɓG�o������Ɍ��j���ꂽ�ꍇ���l��

	// ? ��ʊO -> �A�C�e���𗎂Ƃ��Ȃ��B
	if (IsOutOfScreen(CreateD2Point(enemy.X, enemy.Y), 0.0))
	{
		return;
	}

	GetEnemies().push(CreateEnemy_Item(enemy.X, enemy.Y, enemy.@@_ItemType));
}
