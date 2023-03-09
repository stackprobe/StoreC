/*
	�G����
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy, <boolean> destroyed) // destroyed: �v���C���[��(�̍U���s��)�ɂ���Č��j���ꂽ��
{
	if (destroyed) // ? ���e�ɂ�茂�j���ꂽ�B
	{
		AddEffect_Explode(enemy.X, enemy.Y);
		SE(S_EnemyDead);
	}
	else // ? ���ŁE���� etc.
	{
		AddEffect(Effect_Explode_M(enemy.X, enemy.Y));
	}
}

/*
	�w�肳�ꂽ�G�́u�A�C�e���v�����肷��B
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		false;
//		enemy.Kind == EnemyKind_Item_0001 ||
//		enemy.Kind == EnemyKind_Item_0002 ||
//		enemy.Kind == EnemyKind_Item_0003;

	return ret;
}

/*
	�w�肳�ꂽ�G�́u�G�e�v�����肷��B
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Tama;
//		enemy.Kind == EnemyKind_Tama_0001 ||
//		enemy.Kind == EnemyKind_Tama_0002 ||
//		enemy.Kind == EnemyKind_Tama_0003;

	return ret;
}

/*
	�w�肳�ꂽ�G�́u�{�X�v�����肷��B
*/
function <boolean> IsEnemyBoss(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Boss01;
//		enemy.Kind == EnemyKind_Boss_0001 ||
//		enemy.Kind == EnemyKind_Boss_0002 ||
//		enemy.Kind == EnemyKind_Boss_0003;

	return ret;
}
