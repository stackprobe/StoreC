/*
	�G
*/

/@(ASTR)

/// Enemy_t
{
	<int> Kind // �G�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	// Hint:
	// �v���C���[�Ɍ��j����Ȃ�(���e�ɓ�����Ȃ�)�G�����ꍇ enemy.HP == 0 �ɂ��邱�ƁB
	// -- �A�C�e���E�G�e�Ȃ�
	// �v���C���[�ɓ�����Ȃ��G�����ꍇ enemy.Draw �ɂ����� enemy.Crash == null �ɂ��邱�ƁB
	// -- �A�C�e���Ȃ�
	// ---- �A�C�e���� Draw �Ńv���C���[�Ƃ̓����蔻��E�������s���B

	// �̗�
	// -1 == ���S
	// 0 == ���G
	// 1�` == �c��̗�
	//
	<int> HP

	// �U����
	// 0�` == �U���� -- �[���̏ꍇ�A��e���[�V�����͎��s����邯�Ǒ̗͂�����Ȃ��B
	//
	<int> AttackPoint;

	// ���@�ɓ�����Ə��ł���B
	// -- �G�e��z�肷��B
	//
	<boolean> HitDie;

	// �s���ƕ`��
	// �������ׂ����ƁF
	// -- �s��
	// -- �����蔻��̐ݒu
	// -- �`��
	// �U��Ԃ��Ƃ��̓G��j������B
	//
	<generatorForTask> Draw

	<Crash_t> Crash // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁBnull == �����蔻�薳��

	<Action Enemy_t int> Damaged  // ��e�C�x���g
	<Action Enemy_t boolean> Dead // ���S�C�x���g, ��Q�����F�v���C���[��(�̍U���s��)�ɂ���Č��j���ꂽ��
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawEnemy(<Enemy_t> enemy) // ret: ? ����
{
	return NextVal(enemy.Draw);
}

/*
	��e
*/
function <void> EnemyDamaged(<Enemy_t> enemy, <int> damagePoint)
{
	enemy.Damaged(enemy, damagePoint);
}

/*
	���S
*/
function <void> KillEnemy(<Enemy_t> enemy)
{
	KillEnemy_Destroyed(enemy, false);
}

/*
	���S (���e�ɂ�錂�j)

	destroyed: �v���C���[��(�̍U���s��)�ɂ���Č��j���ꂽ��
*/
function <void> KillEnemy_Destroyed(<Enemy_t> enemy, <boolean> destroyed)
{
	if (enemy.HP != -1) // ? �܂����S���Ă��Ȃ��B
	{
		enemy.HP = -1; // ���S������B
		@@_DeadEnemy(enemy, destroyed);
	}
}

function <void> @@_DeadEnemy(<Enemy_t> enemy, <boolean> destroyed)
{
	enemy.Dead(enemy, destroyed);
}
