/*
	����(�X�e�[�W)�I�����j���[
*/

var<int> @@_PANEL_L = 50; // ����p�l���̍����W
var<int> @@_PANEL_T = 50; // ����p�l���̏���W
var<int> @@_PANEL_W = 200;
var<int> @@_PANEL_H = 120;
var<int> @@_PANEL_X_GAP = 30;
var<int> @@_PANEL_Y_GAP = 20;
var<int> @@_PANEL_X_NUM = 3;
var<int> @@_PANEL_Y_NUM = 3;

var<int> @@_RETURN_BUTTON_L = 50;
var<int> @@_RETURN_BUTTON_T = 480;
var<int> @@_RETURN_BUTTON_W = 500;
var<int> @@_RETURN_BUTTON_H = 100;

function* <generatorForTask> GameProgressMaster()
{
	SetCurtain();
	FreezeInput();

	// �I�����Ă��鍀�ڃC���f�b�N�X
	// 0 == �^�C�g���֖߂�
	// 1 �` (GetMapCount() - 1) == �X�e�[�W�E�C���f�b�N�X
	//
	var<int> selectIndex = 1;

	for (; ; )
	{
		if (DEBUG && GetKeyInput(85) == 1) // ? U -> �S�X�e�[�W�J�� -- (�f�o�b�O�p)
		{
			CanPlayStageIndex = GetMapCount() - 1;
			SaveLocalStorage();
			SE(S_Dead);
		}

		var<int> mapIndex = -1; // -1 == ����

		if (GetMouseDown() == -1)
		{
			var<double> mx = GetMouseX();
			var<double> my = GetMouseY();

			var<int> index = 1;

			for (var<int> y = 0; y < @@_PANEL_Y_NUM; y++)
			for (var<int> x = 0; x < @@_PANEL_X_NUM; x++)
			{
				var<int> l = @@_PANEL_L + x * (@@_PANEL_W + @@_PANEL_X_GAP);
				var<int> t = @@_PANEL_T + y * (@@_PANEL_H + @@_PANEL_Y_GAP);
				var<int> w = @@_PANEL_W;
				var<int> h = @@_PANEL_H;

				if (!IsOut(
					CreateD2Point(mx, my),
					CreateD4Rect(l, t, w, h),
					0.0
					))
				{
					mapIndex = index;
				}

				index++;
			}

			// �^�C�g�����j���[�ɖ߂�{�^��
			{
				var<int> l = @@_RETURN_BUTTON_L;
				var<int> t = @@_RETURN_BUTTON_T;
				var<int> w = @@_RETURN_BUTTON_W;
				var<int> h = @@_RETURN_BUTTON_H;

				if (!IsOut(
					CreateD2Point(mx, my),
					CreateD4Rect(l, t, w, h),
					0.0
					))
				{
					mapIndex = 0;
				}
			}
		}
		if (IsPound(GetInput_8()))
		{
			if (selectIndex == 0)
			{
				selectIndex = -1;
			}
			else
			{
				selectIndex -= @@_PANEL_X_NUM;

				if (selectIndex < 0)
				{
					selectIndex = 0;
				}
			}
		}
		if (IsPound(GetInput_2()))
		{
			if (selectIndex == 0)
			{
				selectIndex = 1;
			}
			else
			{
				selectIndex += @@_PANEL_X_NUM;

				if (GetMapCount() <= selectIndex)
				{
					selectIndex = 0;
				}
			}
		}
		if (IsPound(GetInput_4()))
		{
			selectIndex--;
		}
		if (IsPound(GetInput_6()))
		{
			selectIndex++;
		}
		if (IsPound(GetInput_A()))
		{
			mapIndex = selectIndex;
		}
		if (IsPound(GetInput_B()))
		{
			if (selectIndex == 0)
			{
				break;
			}
			selectIndex = 0;
		}

		if (mapIndex != -1)
		{
			if (mapIndex == 0) // �^�C�g�����j���[�֖߂�B
			{
				break;
			}

			if (CanPlayStageIndex < mapIndex) // ? �v���C�s�� -- ���O�̃X�e�[�W���N���A���Ă��Ȃ��B
			{
				// noop
			}
			else // ? �v���C�\
			{
				yield* @@_Game(mapIndex);

				selectIndex = @@_LastMapIndex;
			}
		}

		{
			var<int> LIMIT = GetMapCount();

			selectIndex += LIMIT;
			selectIndex %= LIMIT;
		}

		// �`�悱������

		@@_DrawWall();

		mapIndex = 1;

		for (var<int> y = 0; y < @@_PANEL_Y_NUM; y++)
		for (var<int> x = 0; x < @@_PANEL_X_NUM; x++)
		{
			var<int> l = @@_PANEL_L + x * (@@_PANEL_W + @@_PANEL_X_GAP);
			var<int> t = @@_PANEL_T + y * (@@_PANEL_H + @@_PANEL_Y_GAP);

			if (selectIndex == mapIndex)
			{
				if (CanPlayStageIndex < mapIndex)
				{
					SetColor("#808000");
				}
				else
				{
					SetColor("#ffff00");
				}
			}
			else
			{
				if (CanPlayStageIndex < mapIndex)
				{
					SetColor("#808080");
				}
				else
				{
					SetColor("#ffffff");
				}
			}

			PrintRect(l, t, @@_PANEL_W, @@_PANEL_H);
			SetColor("#000000");
			SetPrint(l + 50, t + 90, 0);
			SetFSize(80);
			PrintLine(ZPad(mapIndex, 2, "0"));

			mapIndex++;
		}

		// �^�C�g�����j���[�ɖ߂�{�^��
		{
			if (selectIndex == 0)
			{
				SetColor("#ffff00");
			}
			else
			{
				SetColor("#ffffff");
			}

			PrintRect(
				@@_RETURN_BUTTON_L,
				@@_RETURN_BUTTON_T,
				@@_RETURN_BUTTON_W,
				@@_RETURN_BUTTON_H
				);
			SetColor("#000000");
			SetPrint(@@_RETURN_BUTTON_L + 20, @@_RETURN_BUTTON_T + 75, 0);
			SetFSize(60);
			PrintLine("�^�C�g���֖߂�");
		}

		@@_DrawFront();

		yield 1;
	}

	FreezeInput();
}

/*
	���̉�ʂ��痣��鎞�̃��[�V����
*/
function* <generatorForTask> @@_LeaveMotion()
{
	FreezeInput();
	Fadeout();
	SetCurtain_FD(30, -1.0);

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();
		@@_DrawFront();

		yield 1;
	}

	ClearAllEffect();
}

/*
	���̉�ʂ֖߂��ė��鎞�̃��[�V����
*/
function* <generatorForTask> @@_ReturnMotion()
{
	SetCurtain();
	FreezeInput();
	FreezeInputUntilRelease();

	Play(M_Title);
}

/*
	�w�i�`��
*/
function <void> @@_DrawWall()
{
	SetColor("#004060");
	PrintRect(0, 0, Screen_W, Screen_H);
}

/*
	�O�ʕ`��
*/
function <void> @@_DrawFront()
{
	// none
}

var<int> @@_LastMapIndex;

function* <generatorForTask> @@_Game(<int> startMapIndex)
{
	yield* @@_LeaveMotion();

gameBlock:
	{
		for (var<int> mapIndex = startMapIndex; mapIndex < GetMapCount(); mapIndex++)
		{
			@@_LastMapIndex = mapIndex;
			yield* GameMain(mapIndex);

			if (GameEndReason == GameEndReason_e_RETURN_MENU)
			{
				break gameBlock;
			}

			CanPlayStageIndex = Math.max(CanPlayStageIndex, mapIndex + 1);
			SaveLocalStorage();
		}
		yield* Ending();
	}

	yield* @@_ReturnMotion();
}
