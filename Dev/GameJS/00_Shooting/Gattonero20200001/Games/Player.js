/*
	�v���C���[���
*/

/*
	�v���C���[�̈ʒu
*/
var<double> PlayerX = Screen_W / 2.0;
var<double> PlayerY = Screen_H / 2.0;

/*
	���t���[���̓����蔻��, null == �����蔻�薳��
*/
var<Crash_t> PlayerCrash = null;

/*
	�ēo��t���[��
	-- �ēo����J�n����ɂ� 1 ���Z�b�g���邱�ƁB
	0 == ����
	1 �` PLAYER_REBORN_FRAME_MAX == �ēo�ꒆ
*/
var<int> PlayerRebornFrame = 0;

/*
	�ēo�ꒆ�̕`��ʒu
*/
var<double> @@_Reborn_X;
var<double> @@_Reborn_Y;

/*
	���G��ԃt���[��
	-- ���G��Ԃ��J�n����ɂ� 1 ���Z�b�g���邱�ƁB
	0 == ����
	1 �` PLAYER_INVINCIBLE_FRAME_MAX == ���G��Ԓ�
*/
var<int> PlayerInvincibleFrame = 0;

/*
	�U�����x��
	1 �` PLAYER_ATTACK_LV_MAX
*/
var<int> PlayerAttackLv = 1;

/*
	�c�@
	0 �`
*/
var<int> PlayerZankiNum = 3;

function <void> ResetPlayer()
{
	PlayerX = Screen_W / 2.0;
	PlayerY = Screen_H / 2.0;
	PlayerRebornFrame = 0;
	PlayerInvincibleFrame = 0;
	PlayerAttackLv = 1;
	PlayerZankiNum = 3;
}

/*
	�s���ƕ`��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
	-- �`��
*/
function <void> DrawPlayer()
{
	// reset
	{
		PlayerCrash = null;
	}

	// �ړ�
	{
		var<double> SPEED;

		if (1 <= GetInput_A()) // ? �ᑬ�ړ�
		{
			SPEED = 2.5;
		}
		else // ? �����ړ�
		{
			SPEED = 5.0;
		}

		if (1 <= GetInput_2())
		{
			PlayerY += SPEED;
		}
		if (1 <= GetInput_4())
		{
			PlayerX -= SPEED;
		}
		if (1 <= GetInput_6())
		{
			PlayerX += SPEED;
		}
		if (1 <= GetInput_8())
		{
			PlayerY -= SPEED;
		}

		PlayerX = ToRange(PlayerX, 0.0, Screen_W);
		PlayerY = ToRange(PlayerY, 0.0, Screen_H);
	}

rebornBlock:
	if (1 <= PlayerRebornFrame) // ? �ēo�ꒆ
	{
		if (PLAYER_REBORN_FRAME_MAX < ++PlayerRebornFrame)
		{
			PlayerRebornFrame = 0;
			PlayerInvincibleFrame = 1;
			break rebornBlock;
		}
		var<int> frame = PlayerRebornFrame; // �l�� == 2 �` PLAYER_REBORN_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_REBORN_FRAME_MAX, frame);

		// �ēo�ꒆ�̏���
		{
			if (frame == 2) // ����̂�
			{
				@@_Reborn_X = Screen_W / 2.0;
				@@_Reborn_Y = Screen_H + 100.0;
			}

			@@_Reborn_X = Approach(@@_Reborn_X, PlayerX, 1.0 - rate * rate * rate);
			@@_Reborn_Y = Approach(@@_Reborn_Y, PlayerY, 1.0 - rate * rate * rate);
		}

		PlayerCrash = null; // �����蔻�薳���B

		// �`�悱������

		Draw(P_Player, @@_Reborn_X, @@_Reborn_Y, 0.5, (1.0 - rate * rate) * 30.0, 1.0);

		return;
	}

	// �U��
	{
		if (1 <= GetInput_B() && ProcFrame % 4 == 0)
		{
			switch (PlayerAttackLv)
			{
			case 1:
				GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 2:
				GetShots().push(CreateShot_Normal(PlayerX - 10, PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 10, PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 3:
				GetShots().push(CreateShot_Normal(PlayerX - 20, PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX,      PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 20, PlayerY, Math.PI * 1.5, 20.0));
				break;

			default:
				error();
			}

			SE(S_PlayerShoot);
		}
	}

invincibleBlock:
	if (1 <= PlayerInvincibleFrame) // ? ���G���
	{
		if (PLAYER_INVINCIBLE_FRAME_MAX < ++PlayerInvincibleFrame)
		{
			PlayerInvincibleFrame = 0;
			break invincibleBlock;
		}
		var<int> frame = PlayerInvincibleFrame; // �l�� == 2 �` PLAYER_INVINCIBLE_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_INVINCIBLE_FRAME_MAX, frame);

		// ���K���Ԓ��̏���
		{
			// none
		}

		PlayerCrash = null; // �����蔻�薳���B

		// �`�悱������

		Draw(P_Player, PlayerX, PlayerY, 0.5, 0.0, 1.0);

		return;
	}

	// �����蔻��Z�b�g

	PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);

	// �`�悱������

	Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
}
