/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

// �J�����ʒu
// -- (0, 0) �Œ�
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
var<TaskManager_t> GameTasks = CreateTaskManager();

// �O�ʃ^�X�N
var<TaskManager_t> FrontTasks = CreateTaskManager_CEFM(true);

// �V�i���I�E�^�X�N
var<generatorForTask> @@_ScenarioTask = null;

// �w�i�^�X�N
var<generatorForTask> @@_BackgroundTask = null;

// �����蔻���\������t���O (�f�o�b�O�E�e�X�g�p)
var<boolean> @@_PrintAtariFlag = false;

/*
	�Q�[���I�����R
*/
var<GameEndReason_e> GameEndReason = GameEndReason_e_RETURN_MENU;

/*
	�Q�[���ăX�^�[�g�E���N�G�X�g
*/
var<boolean> GameRequestRestartGame = false;

/*
	�Q�[���I�����N�G�X�g(�^�C�g���֖߂�)
*/
var<boolean> GameRequestReturnToTitleMenu = false;

/*
	�X�R�A
*/
var<int> Score = 0;

function* <generatorForTask> GameMain()
{
	// reset
	{
		@@_Enemies = [];
		@@_Shots = [];

		ClearAllTask(GameTasks);
		ClearAllTask(FrontTasks);
		@@_ScenarioTask = null;
		@@_BackgroundTask = null;
		GameEndReason = GameEndReason_e_RETURN_MENU;
		GameRequestRestartGame = false;
		GameRequestReturnToTitleMenu = false;

		ResetPlayer();

		Score = 0;
		BackgroundPhase = 0;
	}

//	var<Func boolean> f_�S�~��� = Supplier(@@_T_�S�~���()); // ���\�b�h��_�p�~
	AddTask(GameTasks, @@_T_�S�~���());

	SetCurtain_FD(0, -1.0);
	SetCurtain();
	FreezeInput();

	@@_ScenarioTask   = CreateScenarioTask();
	@@_BackgroundTask = CreateBackgroundTask();

gameLoop:
	for (; ; )
	{
		if (GetInput_Pause() == 1) // �|�[�Y
		{
			yield* @@_PauseMenu();
		}
		if (GameRequestRestartGame)
		{
			GameEndReason = GameEndReason_e_RESTART_GAME;
			break;
		}
		if (GameRequestReturnToTitleMenu)
		{
			GameEndReason = GameEndReason_e_RETURN_MENU;
			break;
		}

		if (!NextVal(@@_ScenarioTask)) // ? �V�i���I�I�� -> �Q�[���I��
		{
			GameEndReason = GameEndReason_e_GAME_CLEAR;
			break;
		}

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();

		DrawPlayer(); // �v���C���[�̍s���ƕ`��

		// �G�̕`��
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (enemy.HP == -1) // ? ���Ɏ��S
			{
				continue;
			}

			enemy.Crash = null; // reset

			if (!DrawEnemy(enemy))
			{
				enemy.HP = -1;
			}
		}

		// ���e�̕`��
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (shot.AttackPoint == -1) // ? ���Ɏ��S
			{
				continue;
			}

			shot.Crash = null; // reset

			if (!DrawShot(shot))
			{
				shot.AttackPoint = -1;
			}
		}

		ExecuteAllTask(GameTasks);
		ExecuteAllTask(FrontTasks);
		@@_DrawFront();

		if (DEBUG && GetKeyInput(17) == 1) // ? �R���g���[�������� -> �����蔻��\�� (�f�o�b�O�p)
		{
			@@_PrintAtariFlag = !@@_PrintAtariFlag;
		}
		if (@@_PrintAtariFlag)
		{
			SetColor("#000000a0");
			PrintRect(0, 0, Screen_W, Screen_H);
			SetColor("#ffffffa0");

			DrawCrash(PlayerCrash);

			for (var<Enemy_t> enemy of @@_Enemies)
			{
				DrawCrash(enemy.Crash);
			}
			for (var<Shot_t> shot of @@_Shots)
			{
				DrawCrash(shot.Crash);
			}
		}

		// ====
		// �`�悱���܂�
		// ====

		// ====
		// �����蔻�肱������
		// ====

		for (var<int> enemyIndex = 0; enemyIndex < @@_Enemies.length; enemyIndex++)
		{
			var<Enemy_t> enemy = @@_Enemies[enemyIndex];

			if (enemy.HP == -1) // ? ���Ɏ��S
			{
				continue;
			}

			for (var<int> shotIndex = 0; shotIndex < @@_Shots.length; shotIndex++)
			{
				if (enemy.HP == 0) // ? ���G
				{
					continue;
				}

				var<Shot_t> shot = @@_Shots[shotIndex];

				if (shot.AttackPoint == -1) // ? ���Ɏ��S
				{
					continue;
				}

				if (IsCrashed(enemy.Crash, shot.Crash)) // ? �Փ˂��Ă���B�G vs ���e
				{
					var<int> damagePoint = Math.min(enemy.HP, shot.AttackPoint);

					enemy.HP -= damagePoint;
					shot.AttackPoint -= damagePoint;

					if (enemy.HP <= 0) // ? ���S�����B
					{
						KillEnemy_Destroyed(enemy, true);
						break; // ���̓G�͎��S�����̂ŁA���̓G�֐i�ށB
					}

					EnemyDamaged(enemy, damagePoint);

					if (shot.AttackPoint <= 0) // ? �U���͂��g���ʂ������B
					{
						KillShot(shot);
						continue; // ���̎��e�͎��S�����̂ŁA���̎��e�֐i�ށB
					}
				}
			}

			if (enemy.HP == -1) // ? ���Ɏ��S (2���)
			{
				continue;
			}

			if (IsCrashed(enemy.Crash, PlayerCrash)) // ? �Փ˂��Ă���B�G vs ���@
			{
				yield* @@_PlayerDead();

				if (PlayerZankiNum < 1) // ? �c�@�[��
				{
					GameEndReason = GameEndReason_e_GAME_OVER;
					break gameLoop;
				}

				PlayerZankiNum--;
				PlayerRebornFrame = 1;
				break; // ��e�����̂œ����蔻��I��
			}
		}

		// ====
		// �����蔻�肱���܂�
		// ====

//		f_�S�~���(); // ���\�b�h��_�p�~

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? ���S
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? ���S
		});

		yield 1;

		// ������ �Q�[�����[�v�̏I��� ������
	}

	SaveLocalStorage(); // �n�C�X�R�A�X�V

	if (GameEndReason == GameEndReason_e_GAME_OVER)
	{
		Fadeout_F(90);

		for (var<Scene_t> scene of CreateScene(80))
		{
			@@_DrawWall();
			@@_DrawFront();

			yield 1;
		}

		SetCurtain_FD(30, -1.0);

		for (var<Scene_t> scene of CreateScene(40))
		{
			@@_DrawWall();
			@@_DrawFront();

			yield 1;
		}
	}
	else
	{
		SetCurtain_FD(30, -1.0);

		for (var<Scene_t> scene of CreateScene(40))
		{
			@@_DrawWall();
			@@_DrawFront();

			yield 1;
		}
	}

	FreezeInput();

	// ������ end of GameMain() ������
}

function* <generatorForTask> @@_T_�S�~���()
{
	for (; ; )
	{
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (@@_IsProbablyEvacuated(enemy.X, enemy.Y))
			{
				enemy.HP = -1;
			}

			yield 1;
		}

		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (@@_IsProbablyEvacuated(shot.X, shot.Y))
			{
				shot.AttackPoint = -1;
			}

			yield 1;
		}

		yield 1; // @@_Enemies, @@_Shots ����̏ꍇ�A���[�v���� yield �͎��s����Ȃ��̂ŁA�����ɂ� yield ��ݒu���Ă����B
	}
}

function <boolean> @@_IsProbablyEvacuated(<double> x, <double> y)
{
	var<int> MGN_SCREEN_NUM = 3;

	var<boolean> ret = IsOut(
		CreateD2Point(x, y),
		CreateD4Rect_LTRB(
			-Screen_W * MGN_SCREEN_NUM,
			-Screen_H * MGN_SCREEN_NUM,
			Screen_W * (MGN_SCREEN_NUM + 1),
			Screen_H * (MGN_SCREEN_NUM + 1)
			),
		0.0
		);

	return ret;
}

function <Enemy_t[]> GetEnemies()
{
	return @@_Enemies;
}

function <Shot_t[]> GetShots()
{
	return @@_Shots;
}

/*
	�w�ʕ`��
*/
function <void> @@_DrawWall()
{
	NextRun(@@_BackgroundTask);
}

/*
	�O�ʕ`��
*/
function <void> @@_DrawFront()
{
	var<string> strPower;

	switch (PlayerAttackLv)
	{
	case 1: strPower = "������"; break;
	case 2: strPower = "������"; break;
	case 3: strPower = "������"; break;

	default:
		error();
	}

	SetColor(I3ColorToString(CreateI3Color(255, 255, 255)));
	SetPrint(10, 25, 0);
	SetFSize(16);
	PrintLine("Zanki: " + PlayerZankiNum + "�@Power: " + strPower + "�@Score: " + Score);
}

/*
	�v���C���[�̔�e���[�V����
*/
function* <generatorForTask> @@_PlayerDead()
{
	ClearAllEffect();

	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<Scene_t> scene of CreateScene(20))
	{
		yield 1;
	}

	// �G�N���A
	//
	for (var<Enemy_t> enemy of @@_Enemies)
	{
		// �A�C�e���͏��O
		if (IsEnemyItem(enemy))
		{
			// noop
		}
		// �{�X�N���X�̓G�����O
		else if (IsEnemyBoss(enemy))
		{
			// noop
		}
		else
		{
			KillEnemy(enemy);
		}
	}

	// ���e�N���A
	//
	for (var<Shot_t> shot of @@_Shots)
	{
		KillShot(shot);
	}
}

/*
	�|�[�Y���
*/
function* <generatorForTask> @@_PauseMenu()
{
	var<int> selectIndex = 0;

	FreezeInput();

gameLoop:
	for (; ; )
	{
		@@_DrawWall();

		selectIndex = DrawSimpleMenu_CPNP(
			selectIndex,
			50,
			260,
			600,
			50,
			true,
			true,
			[
				"�ŏ������蒼��",
				"�^�C�g���ɖ߂�",
				"�Q�[���ɖ߂�",
			]);

		if (DSM_Desided)
		switch (selectIndex)
		{
		case 0:
			GameRequestRestartGame = true;
			break gameLoop;

		case 1:
			GameRequestReturnToTitleMenu = true;
			break gameLoop;

		case 2:
			break gameLoop;

		default:
			error(); // never
		}
		yield 1;
	}
	FreezeInput();
	FreezeInputUntilRelease();
}
