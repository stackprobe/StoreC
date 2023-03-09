/*
	�Q�[���E���C��
*/

// �J�����ʒu(����)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;
var<int> @@_CreditDisp = @@_Credit;
var<int> @@_CreditDiffStress = 0;

function <void> @(UNQN)_EACH()
{
	@@_CreditDisp = ToInt(Approach(@@_CreditDisp, @@_Credit, 1.0 - 0.0001 * @@_CreditDiffStress));

	if (@@_Credit < @@_CreditDisp)
	{
		@@_CreditDisp--;
	}
	else if (@@_Credit > @@_CreditDisp)
	{
		@@_CreditDisp++;
	}

	if (@@_Credit == @@_CreditDisp)
	{
		@@_CreditDiffStress = 0;
	}
	else
	{
		@@_CreditDiffStress++;
	}
}

function <void> AddGameCredit(<int> value)
{
	@@_Credit += value;
}

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

	for (; ; )
	{
		yield* @@_TitleMain();
	}

	error(); // ���̊֐��͏I�����Ă͂Ȃ�Ȃ��B
}

function* <generatorForTask> @@_TitleMain()
{
	FreezeInput();

	for (; ; )
	{
		Play(M_Title);

		if (GetMouseDown() == -1)
		{
			if (HoveredPicture == P_Lane01Button)
			{
				Play(M_Lane_01);

				yield* @@_SlotMain(1);
			}
			else if (HoveredPicture == P_Lane02Button)
			{
				Play(M_Lane_02);

				yield* @@_SlotMain(2);
			}
			else if (HoveredPicture == P_Lane03Button)
			{
				Play(M_Lane_03);

				yield* @@_SlotMain(3);
			}
			else if (HoveredPicture == P_LaneXXButton)
			{
				Play(M_Lane_XX);

				yield* @@_SlotMain(4);
			}
		}

		// �w�i
		{
			var<double> x = 600.0 + Math.sin(ProcFrame / 777.0) * 300.0;
			var<double> y = 600.0;

			Draw(P_Background, x, y, 1.0, 0.0, 1.0);

			SetColor("#00004080");
			PrintRect(0, 0, Screen_W, Screen_H);
		}

		SetColor("#ffffff");
		SetFSize(100);
		SetPrint(100, 200, 0);
		PrintLine("�ǂ̃��[���֍s���H�H");

		{
			var<double> x = 600.0;
			var<double> y = 400.0;
			var<double> yStep = 180.0;

			Draw(P_Lane01Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane02Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane03Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_LaneXXButton, x, y, 1.0, 0.0, 1.0);
		}

		SetColor("#ffffffa0");
		SetFSize(32);
		SetPrint(10, Screen_H - 10, 0);
		PrintLine("Credit : " + ToThousandComma(@@_CreditDisp) + " / �N���W�b�g�t�^�܂ŁA���� " + GetAddGameCreditRem_MM() + ":" + GetAddGameCreditRem_SS());

		yield 1;
	}

	FreezeInput();
}

/*
	laneNo: 1 - 4
*/
function* <generatorForTask> @@_SlotMain(<int> laneNo)
{
	SE(S_EnterLane);

	@@_LaneNo = laneNo;

	var<int[]> LANE_01_PIC_CNTS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	var<int[]> LANE_02_PIC_CNTS = [ 2, 3, 5, 7, 11, 13, 17, 1, 1 ];
	var<int[]> LANE_03_PIC_CNTS = [ 3, 4, 5, 6, 7, 8, 9, 10, 1 ];
	//*
//	var<int[]> LANE_XX_PIC_CNTS = [ 4, 5, 6, 7, 8, 9, 1, 1, 1 ];
	var<int[]> LANE_XX_PIC_CNTS = [ 15, 3, 3, 3, 1, 1, 1, 1, 1 ];
	/*/
	var<int[]> LANE_XX_PIC_CNTS =
	[
		ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
		ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
		ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
	];
	*/

	var<int[][]> picCntsLst;

	switch (laneNo)
	{
	case 1:
		picCntsLst = [ LANE_01_PIC_CNTS, LANE_01_PIC_CNTS, LANE_01_PIC_CNTS ];
		break;

	case 2:
		picCntsLst = [ LANE_02_PIC_CNTS, LANE_02_PIC_CNTS, LANE_02_PIC_CNTS ];
		break;

	case 3:
		picCntsLst = [ LANE_03_PIC_CNTS, LANE_03_PIC_CNTS, LANE_03_PIC_CNTS ];
		break;

	case 4:
		picCntsLst = [ LANE_XX_PIC_CNTS, LANE_XX_PIC_CNTS, LANE_XX_PIC_CNTS ];
		break;

	default:
		error();
	}

	if (
		picCntsLst.length != 3 ||
		picCntsLst[0].length != SLOT_PIC_NUM ||
		picCntsLst[1].length != SLOT_PIC_NUM ||
		picCntsLst[2].length != SLOT_PIC_NUM
		)
	{
		error();
	}

	var<int[][]> drums = [];

	for (var<int> c = 0; c < 3; c++)
	{
		var<int[]> drum = [];

		for (var<int> i = 0; i < SLOT_PIC_NUM; i++)
		{
			AddElements(drum, Repeat(i, picCntsLst[c][i]));
		}
		Shuffle(drum);
		drums.push(drum);
	}

	@@_Drums = drums;
	@@_DrumRots       = [ 0.0, 0.0, 0.0 ];
	@@_DrumSpeeds     = [ 0.0, 0.0, 0.0 ];
	@@_DrumStoppables = [ false, false, false ];
	@@_Bets           = [ 0, 0, 0, 0, 0 ];
//	@@_LastBets       = [ 5, 5, 5, 5, 5 ];

	// ���[����ς��Ă��ێ�����B
	if (!@@_LastBets)
	{
		@@_LastBets = [ 5, 5, 5, 5, 5 ];
	}

	FreezeInput();

gameLoop:
	for (; ; )
	{
	betLoop:
		for (; ; ) // Bet
		{
			var<D2Point_t> mousePt = CreateD2Point(GetMouseX(), GetMouseY());
			var<int> mouseDown = GetMouseDown();

			for (var<int> c = 0; c < 5; c++)
			{
				if (!IsOut(mousePt, CreateD4Rect_LTRB(
					100,
					150 + c * 200,
					260,
					230 + c * 200), 0.0))
				{
//					if (1 <= @@_Credit && (mouseDown == 1 || (60 <= mouseDown && mouseDown % 10 == 0))) // ? ���� or �A��
					if (1 <= @@_Credit && (mouseDown == 1 || 60 <= mouseDown))
					{
//						var<int> dLmt = 1 + ToFix(mouseDown / 60.0);
//						var<int> dLmt = 1 + ToFix(mouseDown / 10.0);
						var<int> dLmt = 1 + ToFix(mouseDown / 3.0);

						dLmt = Math.min(dLmt, 100);
					
						for (var<int> d = 0; d < dLmt; d++)
						{
							if (@@_Bets[c] < 1000) // ? �����\
							{
//								SE(S_BetCoin);

								@@_Bets[c]++;
								@@_Credit--;
							}
						}
					}
				}
			}

			if (mouseDown == -1)
			{
				if (!IsOut(mousePt, CreateD4Rect_LTRB(0, 0, 280, 80), 0.0)) // Press RESET
				{
					SE(S_GetCoin);

					for (var<int> c = 0; c < 5; c++)
					{
						@@_Credit += @@_Bets[c];
						@@_Bets[c] = 0;
					}
				}

				if (!IsOut(mousePt, CreateD4Rect_LTRB(970, 0, Screen_W, 80), 0.0)) // Press EXIT
				{
					for (var<int> c = 0; c < 5; c++) // �����߂�
					{
						@@_Credit += @@_Bets[c];
//						@@_Bets[c] = 0;
					}

					break gameLoop;
				}

				if (!IsOut(mousePt, CreateD4Rect_LTRB(0, Screen_H - 80, 280, Screen_H), 0.0)) // Press AutoBet / START
				{
					if (@@_IsBetted())
					{
						break betLoop;
					}
					else
					{
						SE(S_BetCoin);

						for (var<int> i = 0; i < 5; i++)
						{
							while (1 <= @@_Credit && @@_Bets[i] < @@_LastBets[i])
							{
								@@_Bets[i]++;
								@@_Credit--;
							}
						}
					}
				}
			}

			@@_DrawSlot();

			yield 1;
		}

		SE(S_RotStart);

		@@_DrumStoppables = [ true, true, true ];

	rotateDrumsLoop:
		for (; ; )
		{
			if (
				!@@_DrumSpeeds.some(v => MICRO < Math.abs(v)) &&
				!@@_DrumStoppables.some(v => v)
				)
			{
				break rotateDrumsLoop;
			}

			// �����p�萔
//			var<double> DRUM_MAX_SPEED = -0.5;
			var<double> DRUM_MAX_SPEED = -0.75;
//			var<double[]> DRUM_ACCELE_RATES = [ 0.94, 0.95, 0.96 ];
			var<double[]> DRUM_ACCELE_RATES = [ 0.97, 0.98, 0.99 ];

			// �����p�萔
			var<double> DRUM_MIN_SPEED = 0.015;
//			var<double> DRUM_MIN_SPEED = 0.03;
//			var<double> DRUM_DECELE_RATE = 0.965;
			var<double> DRUM_DECELE_RATE = 0.97;

			for (var<int> c = 0; c < 3; c++)
			{
				if (GetMouseDown() == 1) // ? �X�g�b�v�{�^������ -- �}�E�X���������u�ԂŔ��肷��B
				{
					var<double> stopBtn_x = 500 + c * 250;
					var<double> stopBtn_y = 1050;
					var<double> stopBtn_r = 100;

					if (GetDistanceLessThan(GetMouseX() - stopBtn_x, GetMouseY() - stopBtn_y, stopBtn_r))
					{
						if (@@_DrumStoppables[c])
						{
							SE(S_RotStop);

							@@_DrumStoppables[c] = false;
						}
					}
				}

				if (@@_DrumStoppables[c]) // ? ��~�O -> ����
				{
					@@_DrumSpeeds[c] = Approach(@@_DrumSpeeds[c], DRUM_MAX_SPEED, DRUM_ACCELE_RATES[c]);
				}
				else // ? ��~�� -> ����
				{
					if (Math.abs(@@_DrumSpeeds[c]) < DRUM_MIN_SPEED)
					{
						var<int> nearestPos = ToInt(@@_DrumRots[c]);

						if (Math.abs(@@_DrumRots[c] - nearestPos) < DRUM_MIN_SPEED)
						{
							@@_DrumRots[c] = nearestPos;
							@@_DrumSpeeds[c] = 0.0;
						}
					}
					else
					{
						@@_DrumSpeeds[c] = Approach(@@_DrumSpeeds[c], 0.0, DRUM_DECELE_RATE);
					}
				}

				@@_DrumRots[c] += @@_DrumSpeeds[c];
			}

			@@_DrawSlot();

			yield 1;
		}

		var<int> prizeCredit = @@_GetPrizeCredit();

		if (1 <= prizeCredit) // ������_���ʃG�t�F�N�g
		{
			SE(S_Atari);

			for (var<int> c = 0; c < 5; c++)
			{
				AddEffectDelay(c * 10 + 20, () => SE(S_GetCoin));
			}

			AddEffect(Effect_Atari_01());
			AddEffectDelay(30, () => AddEffect(Effect_Atari_02()));
			AddEffectDelay(60, () => AddEffect(Effect_Atari_03(prizeCredit)));
		}
		else // �n�Y��_���ʃG�t�F�N�g
		{
			SE(S_Hazure);
		}

		@@_Credit += prizeCredit;

		@@_LastBets = @@_Bets;
		@@_Bets = [ 0, 0, 0, 0, 0 ];
	}

	SE(S_LeaveLane);

	FreezeInput();
}

/*
	���[���ԍ�
	�l�F1 �` 4
*/
var<int> @@_LaneNo;

/*
	��]�h����
	�����F[3][�G���̐�] -- �e�h�����ŊG���̐����Ⴄ���Ƃ�����B
	�l�F�G����index (0 �` (SLOT_PIC_NUM - 1))
*/
var<int[][]> @@_Drums;

/*
	��]�h�����̈ʒu
	�����F[3]
	�l�F����G�����玟�̊G���܂ł� 1.0 �Ƃ���B�v���X�����ŊG���͏�ֈړ� , �}�C�i�X�����ŊG���͉��ֈړ�
*/
var<double[]> @@_DrumRots;

/*
	��]�h�����̑��x
	�����F[3]
	�l�F�t���[������ @@_DrumRots �ɉ��Z����l
*/
var<double[]> @@_DrumSpeeds;

/*
	�h�������~�ł��邩
	�����F[3]
*/
var<boolean[]> @@_DrumStoppables;

/*
	���������R�C����
	�����F[5] -- �΂�(���ォ��E��) , ��i , ���i , ���i , �΂�(��������E��)
	�l�F0 �`
*/
var<int[]> @@_Bets;

/*
	�O�񓊓������R�C����
	�����F@@_Bets �Ɠ���
	�l�F0 �`
*/
var<int[]> @@_LastBets;

function <void> @@_DrawSlot()
{
	SetColor("#ffffff");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<int> c = 0; c < 3; c++)
	{
		// ��]�ʒu���K��
		{
			while (@@_DrumRots[c] < -@@_Drums[c].length)
			{
				@@_DrumRots[c] += @@_Drums[c].length;
			}
			while (0.0 < @@_DrumRots[c])
			{
				@@_DrumRots[c] -= @@_Drums[c].length;
			}
		}

		for (var<int> i = 0; i < @@_Drums[c].length + 3; i++)
		{
			var<double> rot = @@_DrumRots[c] + i;

			if (-1.0 < rot && rot < 3.0)
			{
				var<double> x = 500.0 + c   * 250.0;
				var<double> y = 400.0 + rot * 200.0;

				Draw(P_SlotPics[@@_Drums[c][i % @@_Drums[c].length]], x, y, 1.0, 0.0, 1.0);
			}
		}
	}

	for (var<int> c = 0; c < 3; c++)
	{
		Draw(P_DrumShadow, 500 + c * 250, 600, 1.0, 0.0, 1.0);
	}

	Draw(P_SlotBackground, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(30, 80, 0);
	PrintLine("<RESET>");

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(930, 80, 0);
	PrintLine("<EXIT>");

	SetColor("#ff8000");
	SetFSize(60);
	SetPrint(30, 1160, 0);
	PrintLine(@@_IsBetted() ? "<START>" : "<AutoBet>");

	for (var<int> c = 0; c < 5; c++)
	{
		var<string> dispBet = ZPad(@@_Bets[c], 2, "0");

		if (dispBet == "1000")
		{
			dispBet = "A00";
		}

		SetColor("#ffff00");
		SetFSize(90);
		SetPrint(80, 220 + c * 200, 0);
		PrintLine("[" + dispBet + "]");
	}

	for (var<int> c = 0; c < 3; c++)
	{
		var<boolean> stoppable = @@_DrumStoppables[c];

		SetColor(stoppable ? "#00ffffc0" : "#40a0a0a0");
		PrintCircle(500 + c * 250, 1050, 100);

		SetColor("#004040");
		SetFSize(50);
		SetPrint(435 + c * 250, 1070, 0);
		PrintLine("STOP");
	}

	SetColor("#80ffff");
	SetFSize(32);
	SetPrint(400, 32, 0);
	PrintLine("LANE NO." + @@_LaneNo);

	SetColor("#ffffff");
	SetFSize(60);
	SetPrint(400, 180, 0);
	PrintLine("CREDIT : " + ToThousandComma(@@_CreditDisp));

	SetColor("#a0a0a0");
	SetFSize(32);
	SetPrint(400, 230, 0);
	PrintLine("CREDIT �t�^�܂ŁA���� " + GetAddGameCreditRem_MM() + ":" + GetAddGameCreditRem_SS());

	if (DEBUG)
	{
		SetColor("#ffffff");
		SetFSize(16);
		SetPrint(0, 16, 0);
		PrintLine(GetMouseX() + " " + GetMouseY());
	}

	@@_DrawBettedBar(0, 750, 600, Math.PI * 0.23);
	@@_DrawBettedBar(1, 750, 400, 0.0);
	@@_DrawBettedBar(2, 750, 600, 0.0);
	@@_DrawBettedBar(3, 750, 800, 0.0);
	@@_DrawBettedBar(4, 750, 600, Math.PI * -0.23);
}

function <void> @@_DrawBettedBar(<int> betIdx, x, y, rot)
{
	var<int> bet = @@_Bets[betIdx];

	if (bet == 0)
	{
		return;
	}

	var<boolean> nanameFlag = rot != 0.0;

	var<double> w = 850;
	var<double> h = 20;

	if (nanameFlag)
	{
		w *= 1.3;
	}

	SetColor("#ffff0050");
	PrintRectRot(x, y, w, h, rot);
}

function <boolean> @@_IsBetted()
{
	return @@_Bets.some(v => v != 0);
}

function <int> @@_GetPrizeCredit()
{
	var<int> ret = 0;

	for (var<int> c = 0; c < 5; c++)
	{
		ret += @@_Bets[c] * @@_GetPrize(c);
	}
	return ret;
}

function <int> @@_GetPrize(<int> betIdx)
{
	switch (betIdx)
	{
	case 0: return @@_GetPrize_YPosLst([ 0, 1, 2 ]);
	case 1: return @@_GetPrize_YPosLst([ 0, 0, 0 ]);
	case 2: return @@_GetPrize_YPosLst([ 1, 1, 1 ]);
	case 3: return @@_GetPrize_YPosLst([ 2, 2, 2 ]);
	case 4: return @@_GetPrize_YPosLst([ 2, 1, 0 ]);

	default:
		error();
	}
}

function <int> @@_GetPrize_YPosLst(<int[]> yPosLst)
{
	var<int[]> picIdxs = [];

	for (var<int> c = 0; c < 3; c++)
	{
		var<int> nearestPos = ToInt(@@_DrumRots[c]);
		var<int> i = (yPosLst[c] - nearestPos) % @@_Drums[c].length;
		var<int> picIdx = @@_Drums[c][i];

		picIdxs.push(picIdx);
	}

	if (
		picIdxs[0] == picIdxs[1] &&
		picIdxs[0] == picIdxs[2]
		)
	{
		return SLOT_PIC_PRIZES[picIdxs[0]];
	}

	for (var<int> c = 0; c < 3; c++)
	{
		var<int> picIdx = picIdxs[c];

		if (picIdx == 1) { picIdx = 0; } // 7
		// BAR
		if (picIdx == 4) { picIdx = 3; } // �X�C�J
		if (picIdx == 6) { picIdx = 5; } // �x��
		if (picIdx == 8) { picIdx = 7; } // ��������

		picIdxs[c] = picIdx;
	}

	if (
		picIdxs[0] == picIdxs[1] &&
		picIdxs[0] == picIdxs[2]
		)
	{
		var<int> picIdx = picIdxs[0];

		if (picIdx == 0) // ? 7
		{
			return 100000;
		}
		if (picIdx == 3) // ? �X�C�J
		{
			return 1000;
		}
		if (picIdx == 5) // ? �x��
		{
			return 30;
		}
		if (picIdx == 7) // ? ��������
		{
			return 2;
		}
		error(); // never
	}

	return 0;
}
