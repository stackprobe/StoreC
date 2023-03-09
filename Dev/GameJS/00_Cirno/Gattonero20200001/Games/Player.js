/*
	�v���C���[���
*/

/*
	�v���C���[�̗�
	-1 == ���S
	0 == (�s�g�p�E�\��)
	1�` == �c��̗�
*/
var<int> PlayerHP = PLAYER_HP_MAX;

/*
	�v���C���[�̈ʒu
*/
var<double> PlayerX = 0.0;
var<double> PlayerY = 0.0;

/*
	�v���C���[�E�_���[�W�E�t���[��
	0 == ����
	1�` == �_���[�W��
*/
var<int> PlayerDamageFrame = 0;

/*
	�v���C���[���G���ԃt���[��
	0 == ����
	1�` == ���G���Ԓ�
*/
var<int> PlayerInvincibleFrame = 0;

/*
	�v���C���[�̐��������̑��x
*/
var<double> PlayerYSpeed = 0.0;

/*
	�v���C���[�����������Ă��邩
*/
var<boolean> PlayerFacingLeft = false;

/*
	���t���[���̓����蔻��, null == �����蔻�薳��
*/
var<Crash_t> PlayerCrash = null;

/*
	�v���C���[�ړ��t���[��
	0 == ����
	1�` == �ړ���
*/
var<int> PlayerMoveFrame = 0;

/*
	�v���C���[�E�W�����v�E�J�E���^
	0 == ����
	1�` == �W�����v�����
*/
var<int> PlayerJumpCount = 0;

/*
	�v���C���[�E�W�����v�E�t���[��
	0 == ����
	1�` == �W�����v��
*/
var<int> PlayerJumpFrame = 0;

/*
	�v���C���[�؋�t���[��
	0 == ����
	1�` == �؋�
*/
var<int> PlayerAirborneFrame = 0;

/*
	�v���C���[���Ⴊ�݃t���[��
	0 == ����
	1�` == ���Ⴊ�ݒ�
*/
var<int> PlayerShagamiFrame = 0;

/*
	�v���C���[������t���[��
	0 == ����
	1�` == �������
*/
var<int> PlayerUwamukiFrame = 0;

/*
	�v���C���[�������t���[��
	0 == ����
	1�` == ��������
*/
var<int> PlayerShitamukiFrame = 0;

/*
	�v���C���[�U���t���[��
	0 == ����
	1�` == �U����
*/
var<int> PlayerAttackFrame = 0;

/*
	�v���C���[�U�����[�V����
	-- �U��(Attack)�ƌ����Ă��U���ȊO�̗��p(�X���C�f�B���O�E��q�Ȃ�)���z�肷��B
	null == ����
	null != DrawPlayer�̑���Ɏ��s�����B
*/
var<Func boolean> PlayerAttack = null;

var<boolean> @@_JumpLock = false;
var<boolean> @@_MoveSlow = false;

function <void> ResetPlayer()
{
	PlayerHP = PLAYER_HP_MAX;
	PlayerX = Screen_W / 2.0;
	PlayerY = Screen_H / 2.0;
	PlayerDamageFrame = 0;
	PlayerInvincibleFrame = 0;
	PlayerYSpeed = 0.0;
	PlayerFacingLeft = false;
	PlayerCrash = null;
	PlayerMoveFrame = 0;
	PlayerJumpCount = 0;
	PlayerJumpFrame = 0;
	PlayerAirborneFrame = ToFix(IMAX / 2); // �Q�[���J�n����ɋ󒆂ŃW�����v�ł��Ȃ��悤��
	PlayerShagamiFrame = 0;
	PlayerUwamukiFrame = 0;
	PlayerShitamukiFrame = 0;
	PlayerAttackFrame = 0;
	PlayerAttack = null;
	@@_JumpLock = false;
	@@_MoveSlow = false;
}

/*
	�s��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
*/
function <void> ActPlayer()
{
	// reset
	{
		PlayerCrash = null;
	}

	if (DEBUG && GetKeyInput(84) == 1) // ? T ���� -> �U���e�X�g
	{
		PlayerAttack = Supplier(CreateAttack_BDummy());
		return; // HACK: ���̃t���[���̂ݓ����蔻�薳����� -- 1�t���[���Ȃ̂Ŋŉ߂���B�l�q�� @ 2022.7.31
	}

	// ����
	{
		var<boolean> damageOrUID = 1 <= PlayerDamageFrame || UserInputDisabled;
		var<boolean> move = false;
		var<boolean> slow = false;
		var<boolean> attack = false;
		var<boolean> shagami = false;
		var<boolean> uwamuki = false;
		var<boolean> shitamuki = false;
		var<int> jump = 0;

		if (!damageOrUID && 1 <= GetInput_8())
		{
			uwamuki = true;
		}
		if (!damageOrUID && 1 <= GetInput_2())
		{
			shagami = true;
			shitamuki = true;
		}
		if (!damageOrUID && 1 <= GetInput_4())
		{
			PlayerFacingLeft = true;
			move = true;
		}
		if (!damageOrUID && 1 <= GetInput_6())
		{
			PlayerFacingLeft = false;
			move = true;
		}
		if (!damageOrUID && 1 <= GetInput_B())
		{
//			slow = true;
			attack = true;
		}
		if (!damageOrUID && 1 <= GetInput_A())
		{
			jump = GetInput_A();
		}

		if (move)
		{
			PlayerMoveFrame++;
			shagami = false;
//			uwamuki = false;
//			shitamuki = false;
		}
		else
		{
			PlayerMoveFrame = 0;
		}

		@@_MoveSlow = move && slow;

		if (jump == 0)
		{
			@@_JumpLock = false;
		}

		if (1 <= PlayerJumpFrame) // ? �W�����v��
		{
			if (1 <= jump)
			{
				PlayerJumpFrame++;
			}
			else
			{
				// �� �W�����v�𒆒f�E�I�������B

				PlayerJumpFrame = 0;

				if (PlayerYSpeed < 0.0)
				{
					PlayerYSpeed /= 2.0;
				}
			}
		}
		else // ? �ڒn�� || �؋�
		{
			// ���O���� == ���n�O�̐��t���[���ԂɃW�����v�{�^���������n�߂Ă��W�����v�ł���悤�ɂ���B
			// ���͗P�\ == ����(�n�ʂ��痣�ꂽ)����̐��t���[���ԂɃW�����v�{�^���������n�߂Ă��W�����v�ł���悤�ɂ���B

			var<int> ���O���͎��� = 10;
			var<int> ���͗P�\���� = 5;

			if (PlayerAirborneFrame < ���͗P�\���� && PlayerJumpCount == 0)
			{
				if (1 <= jump && jump < ���O���͎��� && !@@_JumpLock) // ? �ڒn��Ԃ���̃W�����v���\�ȏ��
				{
					// �� �W�����v���J�n�����B

					PlayerJumpFrame = 1;
					PlayerJumpCount = 1;

					PlayerYSpeed = PLAYER_JUMP_SPEED;

					@@_JumpLock = true;
				}
				else
				{
					PlayerJumpCount = 0;
				}
			}
			else // ? �ڒn��Ԃ���̃W�����v���u�\�ł͂Ȃ��v���
			{
				// �؋��Ԃɓ�������u�ʏ�W�����v�̏�ԁv�ɂ���B
				if (PlayerJumpCount < 1)
				{
					PlayerJumpCount = 1;
				}

				if (1 <= jump && jump < ���O���͎��� && PlayerJumpCount < PLAYER_JUMP_MAX && !@@_JumpLock)
				{
					// �� ��(n-�i)�W�����v���J�n�����B

					PlayerJumpFrame = 1;
					PlayerJumpCount++;

					PlayerYSpeed = PLAYER_JUMP_SPEED;

					AddEffect(Effect_Jump(PlayerX, PlayerY + PLAYER_�ڒn����Pt_Y));

					@@_JumpLock = true;
				}
				else
				{
					// noop
				}
			}
		}

		if (PlayerJumpFrame == 1) // ? �W�����v�J�n
		{
			SE(S_Jump);
		}

		if (1 <= PlayerAirborneFrame)
		{
			shagami = false;
//			uwamuki = false;
//			shitamuki = false;
		}

		if (shagami)
		{
			PlayerShagamiFrame++;
		}
		else
		{
			PlayerShagamiFrame = 0;
		}

		if (uwamuki)
		{
			PlayerUwamukiFrame++;
		}
		else
		{
			PlayerUwamukiFrame = 0;
		}

		if (shitamuki)
		{
			PlayerShitamukiFrame++;
		}
		else
		{
			PlayerShitamukiFrame = 0;
		}

		if (attack)
		{
			PlayerAttackFrame++;
		}
		else
		{
			PlayerAttackFrame = 0;
		}
	}

damageBlock:
	if (1 <= PlayerDamageFrame) // ? �_���[�W��
	{
		if (PLAYER_DAMAGE_FRAME_MAX < ++PlayerDamageFrame)
		{
			PlayerDamageFrame = 0;
			PlayerInvincibleFrame = 1;
			break damageBlock;
		}
		var<int> frame = PlayerDamageFrame; // �l�� == 2 �` PLAYER_DAMAGE_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_DAMAGE_FRAME_MAX, frame);

		// �_���[�W���̏���
		{
			if (frame == 2) // ����̂�
			{
				SE(S_Damaged);
			}

			PlayerX -= (1.0 - rate) * 9.0 * (PlayerFacingLeft ? -1 : 1);
		}
	}

invincibleBlock:
	if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
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
	}

	// �ړ�
	{
		if (1 <= PlayerMoveFrame)
		{
			var<double> speed;

			if (@@_MoveSlow)
			{
				speed = PlayerMoveFrame / 10.0;
				speed = Math.min(speed, PLAYER_SLOW_SPEED);
			}
			else
			{
				/*/
				// ����o�����ɉ�������B
				{
					speed = (PlayerMoveFrame + 1) / 2.0;
					speed = Math.min(speed, PLAYER_SPEED);
				}
				/*/
				// ����o�����ɉ������Ȃ��B
				{
					speed = PLAYER_SPEED;
				}
				//*/
			}
			speed *= PlayerFacingLeft ? -1.0 : 1.0;

			PlayerX += speed;
		}
		else
		{
			PlayerX = ToInt(PlayerX);
		}

		// �d�͂ɂ�����
		PlayerYSpeed += PLAYER_GRAVITY;

		// ���R�����̍ō����x�𒴂��Ȃ��悤�ɋ���
		PlayerYSpeed = Math.min(PlayerYSpeed, PLAYER_FALL_SPEED_MAX);

		// ���R����
		PlayerY += PlayerYSpeed;
	}

	// �ʒu����
	{
		var<boolean> touchSide_L =
			IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT ) ||
			IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY                        ) ||
			IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB );

		var<boolean> touchSide_R =
			IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT ) ||
			IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY                        ) ||
			IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB );

		if (touchSide_L && touchSide_R) // -> �ǔ����h�~�̂��ߍă`�F�b�N
		{
			touchSide_L = IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY);
			touchSide_R = IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY);
		}

		if (touchSide_L && touchSide_R)
		{
			// noop
		}
		else if (touchSide_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_���ʔ���Pt_X) + TILE_W / 2.0 + PLAYER_���ʔ���Pt_X;
		}
		else if (touchSide_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_���ʔ���Pt_X) - TILE_W / 2.0 - PLAYER_���ʔ���Pt_X;
		}

		var<boolean> touchCeiling_L = IsPtWall_XY(PlayerX - PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y);
		var<boolean> touchCeiling_M = IsPtWall_XY(PlayerX                       , PlayerY - PLAYER_�]�V����Pt_Y);
		var<boolean> touchCeiling_R = IsPtWall_XY(PlayerX + PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y);

		if ((touchCeiling_L && touchCeiling_R) || touchCeiling_M)
		{
			if (PlayerYSpeed < 0.0)
			{
				// �v���C���[�ƓV��̔����W��
				//
//				var<double> K = 1.0;
				var<double> K = 0.0;

				PlayerY = ToTileCenterY(PlayerY - PLAYER_�]�V����Pt_Y) + TILE_H / 2 + PLAYER_�]�V����Pt_Y;
				PlayerYSpeed = Math.abs(PlayerYSpeed) * K;
				PlayerJumpFrame = 0;
			}
		}
		else if (touchCeiling_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_�]�V����Pt_X) + TILE_W / 2.0 + PLAYER_�]�V����Pt_X;
		}
		else if (touchCeiling_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_�]�V����Pt_X) - TILE_W / 2.0 - PLAYER_�]�V����Pt_X;
		}

		var<boolean> touchGround =
			IsPtWall_XY(PlayerX - PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y) ||
			IsPtWall_XY(PlayerX + PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y);

		// memo: @ 2022.7.11
		// �㏸��(�W�����v��)�ɐڒn���肪�������邱�Ƃ�����B
		// �ڒn���͏d�͂ɂ�� PlayerYSpeed ���v���X�ɐU���B
		// -> �ڒn�ɂ��ʒu���̒����� PlayerYSpeed ���v���X�ɐU��Ă���ꍇ�̂ݍs���B

		if (touchGround && 0.0 < PlayerYSpeed)
		{
			PlayerY = ToTileCenterY(PlayerY + PLAYER_�ڒn����Pt_Y) - TILE_H / 2.0 - PLAYER_�ڒn����Pt_Y;
			PlayerYSpeed = 0.0;
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
		}
		else
		{
			PlayerAirborneFrame++;
		}
	}

	// �U��
	{
		if (1 <= PlayerAttackFrame && ProcFrame % 4 == 0)
		{
			if (1 <= PlayerUwamukiFrame)
			{
				var<Shot_t> shot = CreateShot_Normal(PlayerX, PlayerY - 20.0, PlayerFacingLeft, true, false);

				GetShots().push(shot);
			}
			else
			{
				var<Shot_t> shot = CreateShot_Normal(PlayerX + 30.0 * (PlayerFacingLeft ? -1 : 1), PlayerY + 4.0, PlayerFacingLeft, false, false);

				GetShots().push(shot);
			}

			SE(S_Shoot);
		}
	}

	// �����蔻����Z�b�g����B
	// -- �_���[�W���E���G���Ԓ��� null (�����蔻�薳��) ���Z�b�g���邱�ƁB

	PlayerCrash = null; // reset

	if (1 <= PlayerDamageFrame) // ? �_���[�W��
	{
		// noop
	}
	else if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
	{
		// noop
	}
	else
	{
		PlayerCrash = CreateCrash_Circle(
			PlayerX,
			PlayerY,
			10.0
			);
	}
}

/*
	�`��
	�������ׂ����ƁF
	-- �`��
*/
function <void> DrawPlayer()
{
	var<double> plA = 1.0;
	var<Picture_t> picture = P_Dummy;

	if (
		1 <= PlayerDamageFrame ||
		1 <= PlayerInvincibleFrame
		)
	{
		plA = 0.5;
	}

	if (1 <= PlayerAirborneFrame)
	{
		picture = PlayerFacingLeft ? P_PlayerMirrorJump : P_PlayerJump;
	}
	else if (1 <= PlayerMoveFrame)
	{
		var<int> koma = ToFix(ProcFrame / 6);

		if (koma < 4)
		{
			// none
		}
		else
		{
			koma %= 4;

			if (koma == 0)
			{
				koma = 2;
			}
		}

		picture = (PlayerFacingLeft ? P_PlayerMirrorRun : P_PlayerRun)[koma];
	}
	else if (1 <= PlayerAttackFrame && PlayerUwamukiFrame == 0)
	{
		picture = PlayerFacingLeft ? P_PlayerMirrorAttack : P_PlayerAttack;
	}
	else
	{
		picture = PlayerFacingLeft ? P_PlayerMirrorStand : P_PlayerStand;
	}

	Draw(picture, PlayerX - Camera.X, PlayerY - Camera.Y, plA, 0.0, 1.0);
}
