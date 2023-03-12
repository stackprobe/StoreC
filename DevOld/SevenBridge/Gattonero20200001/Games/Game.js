/*
	�Q�[���E���C��
*/

// �J�����ʒu(����)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;
var<int> @@_Bet = 0;

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
		@@_Bet = 0;
		@@_BattleNow = false;

		yield* @@_BetMain();

		@@_BattleNow = true;
		@@_DealerDamage = 0;

		for (; ; )
		{
			yield* @@_BattleMain();

			if (@@_DealerDamage < 0)
			{
				break;
			}
			else if (@@_DEALER_DAMAGE_MAX <= @@_DealerDamage)
			{
				yield* GohoubiMain();

				break;
			}
		}
	}
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);
}

var<boolean> @@_BattleNow = false;

function* <generatorForTask> @@_E_DrawBackground()
{
	var<double> zoom = 2020.0 / 1080.0; // �\���T�C�Y / �摜�̍�������
	var<double> rot = 0.0;
	var<double> rotAdd = 0.0;
	var<D4Color_t> maskColor = CreateD4Color(0.0, 0.0, 0.0, 1.0);

	for (; ; )
	{
		if (@@_BattleNow)
		{
			rotAdd = Approach(rotAdd, 0.0003, 0.991);
			maskColor.A = Approach(maskColor.A, 0.7, 0.95);
		}
		else
		{
			rotAdd = Approach(rotAdd, 0.0, 0.993);
			maskColor.A = Approach(maskColor.A, 0.9, 0.95);
		}
		rot += rotAdd;

		Draw(P_Background, Screen_W / 2.0, Screen_H / 2.0, 1.0, rot, zoom);

		SetColor(I4ColorToString(D4ColorToI4Color(maskColor)));
		PrintRect(0, 0, Screen_W, Screen_H);

		yield 1;
	}
}

var<generatorForTask> @@_Task_DrawBackground = null

function <void> @@_DrawBackground()
{
	if (@@_Task_DrawBackground == null)
	{
		@@_Task_DrawBackground = @@_E_DrawBackground();
	}
	NextRun(@@_Task_DrawBackground);
}

function* <generatorForTask> @@_BetMain()
{
	Play(M_Title);

	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			var<int> INC_SPAN = 10;

			if (HoveredPicture == P_ButtonBetUp)
			{
				var<int> inc = Math.min(INC_SPAN, @@_Credit);

				@@_Credit -= inc;
				@@_Bet += inc;
			}
			if (HoveredPicture == P_ButtonBetDown)
			{
				var<int> inc = Math.min(INC_SPAN, @@_Bet);

				@@_Credit += inc;
				@@_Bet -= inc;
			}
			if (HoveredPicture == P_ButtonStart)
			{
				if (1 <= @@_Bet)
				{
					break;
				}
			}
		}

		var<int> remSec = ToFix(GetAddGameCreditRemFrame() / 60.0) + 1;

		var<string> mm = ZPad(ToFix(remSec / 60), 2, "0");
		var<string> ss = ZPad(      remSec % 60,  2, "0");

		// �`�悱������

		@@_DrawBackground();

		SetColor("#ffffff");
		SetFSize(120);
		SetPrint(100, 500, 300);
		PrintLine("CREDIT: " + @@_Credit);
		PrintLine("BET: "    + @@_Bet);

		SetFSize(60);
		SetPrint(200, 1150, 0);
		PrintLine("CREDIT �t�^�܂Ł@" + mm + " : " + ss);

		Draw(P_ButtonBetUp,    200, 1500, @@_Credit == 0 ? 0.2 : 1.0, 0.0, 1.0);
		Draw(P_ButtonBetDown,  600, 1500, @@_Bet    == 0 ? 0.2 : 1.0, 0.0, 1.0);
		Draw(P_ButtonStart,   1000, 1500, @@_Bet    == 0 ? 0.2 : 1.0, 0.0, 1.0);

		SetColor("#ff8000");
		SetFSize(100);
		SetPrint(
			@@_Bet == 0 ? 150 : 950,
			1650 + ToFix(Math.abs(Math.sin(ProcFrame / 20.0)) * 30.0),
			0
			);
		PrintLine("��");

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);
		yield 1;
	}
	FreezeInput();

	SE(S_Start);
}

var<int> @@_DEALER_DAMAGE_MAX = 7;

/*
	�f�B�[���[�̃_���[�W
	�����l�F0
	�l��F-1 �` @@_DEALER_DAMAGE_MAX
*/
var<int> @@_DealerDamage = 0;

var<Deck_t> DealerDeck;
var<Deck_t> PlayerDeck;

var<Trump_t[]> RCards; // ���o�����̃J�[�h�̎R
var<Trump_t[]> WCards; // �̂Ă���̃J�[�h�̎R

var<double> RCards_X = Screen_W - 150;
var<double> RCards_Y = 790;

var<double> WCards_X = Screen_W - 150;
var<double> WCards_Y = 1210;

function* <generatorForTask> @@_BattleMain()
{
	// �o�g���ȍĐ�
	{
		var<Sound_t[]> BGM_LST =
		[
			M_Battle_03,
			M_Battle_01,
			M_Battle_02,
		];

		var<int> bgmIdx = ToInt(@@_Bet / 10) % 3;

		Play(BGM_LST[bgmIdx]);
	}

	DealerDeck = CreateDeck( 170,  590);
	PlayerDeck = CreateDeck(1430, 1010);

	RCards = [];
	WCards = [];

	for (var<Suit_e> suit = 1; suit <= 4; suit++)
	for (var<int> number = 1; number <= 13; number++)
	{
		RCards.push(CreateActor_Trump(RCards_X, RCards_Y, suit, number, true));
	}
	@@_ShuffleCards(RCards);

	for (var<int> c = 0; c < 7; c++)
	{
		GetDeckCards(DealerDeck).push(RCards.pop());
		GetDeckCards(PlayerDeck).push(RCards.pop());

		AddDelay(GameTasks, c * 3, () => SetTrumpReversed(GetDeckCards(PlayerDeck)[c], false));

		AddActor(GetDeckCards(DealerDeck)[c]);
		AddActor(GetDeckCards(PlayerDeck)[c]);
	}

	SetDeckCardsAutoPos(DealerDeck, false, true);
	SetDeckCardsAutoPos(PlayerDeck, false, true);

	for (var<Scene_t> scene of CreateScene(50))
	{
		@@_DrawBackground();
		@@_DrawBattleWall();

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);
		yield 1;
	}

	SortDeck(DealerDeck);
	SortDeck(PlayerDeck);
	SetDeckCardsAutoPos(PlayerDeck, true, false);
	AddDelay(GameTasks, 30, () => SetDeckCardsAutoPos(DealerDeck, true, false));

battleLoop:
	for (; ; )
	{
		// ==================
		// �v���C���[�̃^�[��
		// ==================
		{
			var<int[]> idxsChow  = WCards.length == 0 ? null  : GetChowIndexes( PlayerDeck, WCards[WCards.length - 1]);
			var<int[]> idxsPong  = WCards.length == 0 ? null  : GetPongIndexes( PlayerDeck, WCards[WCards.length - 1]);
			var<boolean> ronFlag = WCards.length == 0 ? false : IsCanRon(       PlayerDeck, WCards[WCards.length - 1]);
			var<boolean> doTsumoFlag = true;

		beforeTsumoPhase:
			{
				var<string> items = [];

				var<string> ITEM_CHOW = "�`�[";
				var<string> ITEM_PONG = "�|��";
				var<string> ITEM_RON  = "����";
				var<string> ITEM_NOOP = "���Ȃ�";

				if (idxsChow != null)
				{
					items.push(ITEM_CHOW);
				}
				if (idxsPong != null)
				{
					items.push(ITEM_PONG);
				}
				if (ronFlag)
				{
					items.push(ITEM_RON);
				}

				if (1 <= items.length)
				{
					items.push(ITEM_NOOP);

					var<string> selItem;
					yield* @@_Menu(items, item => selItem = item);

					if (selItem == ITEM_CHOW) // ? �`�[�I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Chow, "P"));
						SE(S_Chow);
						@@_ExecuteMeld(PlayerDeck, idxsChow, [ WCards.pop() ]);
						doTsumoFlag = false;
						break beforeTsumoPhase;
					}
					if (selItem == ITEM_PONG) // ? �|���I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Pong, "P"));
						SE(S_Pong);
						@@_ExecuteMeld(PlayerDeck, idxsPong, [ WCards.pop() ]);
						doTsumoFlag = false;
						break beforeTsumoPhase;
					}
					if (selItem == ITEM_RON) // ? �����I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Ron, "P"));
						SE(S_YouWin);
						yield* @@_E_ExecuteAgari(PlayerDeck, [ WCards.pop() ], "P");
						break battleLoop;
					}
				}
			}

		tsumoLoop:
			for (; ; )
			{
				if (doTsumoFlag)
				{
					yield* @@_CheckRemYama();
					yield* @@_WaitToTouch("Tap to TSUMO");

					var<Trump_t> card = RCards.pop();

					PlayerDeck.Cards.push(card);
					AddActor(card);

					SetTrumpReversed(card, false);
					SetTrumpAutoStRot(card);
					SetDeckCardsAutoPos(PlayerDeck, true, false);
				}
				doTsumoFlag = true; // restore

				var<int[]> idxsKong    = GetKongIndexes( PlayerDeck);
				var<boolean> agariFlag = IsCanAgari(     PlayerDeck);

				{
					var<string> items = [];

					var<string> ITEM_KONG  = "�J��";
					var<string> ITEM_AGARI = "�c��";
					var<string> ITEM_NOOP  = "���Ȃ�";

					if (idxsKong != null)
					{
						items.push(ITEM_KONG);
					}
					if (agariFlag)
					{
						items.push(ITEM_AGARI);
					}

					if (1 <= items.length)
					{
						items.push(ITEM_NOOP);

						var<string> selItem;
						yield* @@_Menu(items, item => selItem = item);

						if (selItem == ITEM_KONG) // ? �J���I��
						{
							AddEffect(@@_E_MeldEffect(P_Balloon_Kong, "P"));
							SE(S_Kong);
							@@_ExecuteMeld(PlayerDeck, idxsKong, []);
							continue tsumoLoop;
						}
						if (selItem == ITEM_AGARI) // ? �c��(�A�K��)�I��
						{
							AddEffect(@@_E_MeldEffect(P_Balloon_Agari, "P"));
							SE(S_YouWin);
							yield* @@_E_ExecuteAgari(PlayerDeck, [], "P");
							break battleLoop;
						}
					}
				}

				break; // �Œ�-break
			}

			var<int> wasteCardIndex = -1;

			@@_SetMessage("DROP YOUR CARD");

			for (; ; )
			{
				if (GetMouseDown() == -1)
				if (!IsOutOfScreen(CreateD2Point(GetMouseX(), GetMouseY()), 0.0))
				if (Screen_H - GetPicture_H(P_TrumpFrame) < GetMouseY())
				{
					var<double> x = GetMouseX();
					var<int> i;

					for (i = PlayerDeck.Cards.length - 1; 0 < i; i--)
					{
						if (PlayerDeck.Cards[i].X - GetPicture_W(P_TrumpFrame) / 2 < x)
						{
							break;
						}
					}
					wasteCardIndex = i;
					break;
				}

				@@_DrawBackground();
				@@_DrawBattleWall();

				ExecuteAllActor();
				ExecuteAllTask(GameTasks);

				yield 1;
			}
			FreezeInput();

			@@_SetMessage("");

			{
				var<Trump_t> card = DesertElement(PlayerDeck.Cards, wasteCardIndex);

				@@_DBW_TopWCard_X   = card.X;
				@@_DBW_TopWCard_Y   = card.Y;
				@@_DBW_TopWCard_Rot = GetRand2() * 33.0;

				KillActor(card);
				SetTrumpPos_Direct(card, WCards_X, WCards_Y);
				WCards.push(card);

				SortDeck(PlayerDeck);
				SetDeckCardsAutoPos(PlayerDeck, true, false);
			}

			for (var<Scene_t> scene of CreateScene(30)) // �J�[�h�̂ă��[�V�����҂�
			{
				@@_DrawBackground();
				@@_DrawBattleWall();

				ExecuteAllActor();
				ExecuteAllTask(GameTasks);
				yield 1;
			}
		}
		// End_�v���C���[�̃^�[��

		// ==================
		// �f�B�[���[�̃^�[��
		// ==================
		{
			var<int[]> idxsChow  = WCards.length == 0 ? null  : GetChowIndexes( DealerDeck, WCards[WCards.length - 1]);
			var<int[]> idxsPong  = WCards.length == 0 ? null  : GetPongIndexes( DealerDeck, WCards[WCards.length - 1]);
			var<boolean> ronFlag = WCards.length == 0 ? false : IsCanRon(       DealerDeck, WCards[WCards.length - 1]);
			var<boolean> doTsumoFlag = true;

		beforeTsumoPhase:
			{
				// ���ӁF�����D��

				if (ronFlag) // ? �����\
				{
					// ���
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Ron, "D"));
						SE(S_YouLose);
						yield* @@_E_ExecuteAgari(DealerDeck, [ WCards.pop() ], "D");
						break battleLoop;
					}
				}
				if (idxsChow != null) // ? �`�[�\
				{
					if (GetRand1() < 0.7) // �m���I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Chow, "D"));
						SE(S_Chow);
						@@_ExecuteMeld(DealerDeck, idxsChow, [ WCards.pop() ]);
						doTsumoFlag = false;
						break beforeTsumoPhase;
					}
				}
				if (idxsPong != null) // ? �|���\
				{
					if (GetRand1() < 0.7) // �m���I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Pong, "D"));
						SE(S_Pong);
						@@_ExecuteMeld(DealerDeck, idxsPong, [ WCards.pop() ]);
						doTsumoFlag = false;
						break beforeTsumoPhase;
					}
				}
			}

		tsumoLoop:
			for (; ; )
			{
				if (doTsumoFlag)
				{
					yield* @@_CheckRemYama();

					var<Trump_t> card = RCards.pop();

					DealerDeck.Cards.push(card);
					AddActor(card);

					SetTrumpReversed(card, true); // ���̂܂܁I
					SetTrumpAutoStRot(card);
					SetDeckCardsAutoPos(DealerDeck, true, false);
				}
				doTsumoFlag = true; // restore

				for (var<Scene_t> scene of CreateScene(60)) // �f�B�[���[�l���Ă�t��
				{
					@@_DrawBackground();
					@@_DrawBattleWall();

					ExecuteAllActor();
					ExecuteAllTask(GameTasks);
					yield 1;
				}

				var<int[]> idxsKong    = GetKongIndexes( DealerDeck);
				var<boolean> agariFlag = IsCanAgari(     DealerDeck);

				// ���ӁF�c��(�A�K��)�D��

				if (agariFlag) // ? �c��(�A�K��)�\
				{
					// ���
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Agari, "D"));
						SE(S_YouLose);
						yield* @@_E_ExecuteAgari(DealerDeck, [], "D");
						break battleLoop;
					}
				}
				if (idxsKong != null) // ? �J���\
				{
					if (GetRand1() < 0.7) // �m���I��
					{
						AddEffect(@@_E_MeldEffect(P_Balloon_Kong, "D"));
						SE(S_Kong);
						@@_ExecuteMeld(DealerDeck, idxsKong, []);

						for (var<Scene_t> scene of CreateScene(30)) // �f�B�[���[�F�J������̃c���҂�
						{
							@@_DrawBackground();
							@@_DrawBattleWall();

							ExecuteAllActor();
							ExecuteAllTask(GameTasks);
							yield 1;
						}
						continue tsumoLoop;
					}
				}

				break; // �Œ�-break
			}

			var<int> wasteCardIndex = GetWasteIndex(DealerDeck);

			{
				var<Trump_t> card = DesertElement(DealerDeck.Cards, wasteCardIndex);

				@@_DBW_TopWCard_X   = card.X;
				@@_DBW_TopWCard_Y   = card.Y;
				@@_DBW_TopWCard_Rot = GetRand2() * 33.0;

				KillActor(card);
				SetTrumpPos_Direct(card, WCards_X, WCards_Y);
				WCards.push(card);
				SetTrumpReversed(card, false); // �\�ɂ���I

				SortDeck(DealerDeck);
				SetDeckCardsAutoPos(DealerDeck, true, false);
			}

			for (var<Scene_t> scene of CreateScene(30)) // �J�[�h�̂ă��[�V�����҂�
			{
				@@_DrawBackground();
				@@_DrawBattleWall();

				ExecuteAllActor();
				ExecuteAllTask(GameTasks);
				yield 1;
			}
		}
		// End_�f�B�[���[�̃^�[��
	}
	// End_battleLoop

	DealerDeck = null;
	PlayerDeck = null;

	RCards = null;
	WCards = null;

	for (var<Actor_t> actor of GetAllActor())
	{
		if (actor.Kind == ActorKind_Trump)
		{
			KillActor(actor);
		}
	}
}

var<double> @@_DBW_TopWCard_X   = 0.0;
var<double> @@_DBW_TopWCard_Y   = 0.0;
var<double> @@_DBW_TopWCard_Rot = 0.0;

function <void> @@_DrawBattleWall()
{
	var<string> ddMeter = "";

	for (var<int> i = 0; i < @@_DEALER_DAMAGE_MAX; i++)
	{
		ddMeter += i < @@_DealerDamage ? "��" : "��";
	}

	SetColor("#00000080");
	PrintRect_LTRB(10, 10, Screen_W - 10, 160);

	SetColor("#ffffff");
	SetFSize(50);
	SetPrint(30, 70, 70);
	PrintLine("CREDIT: " + @@_Credit + " / BET: " + @@_Bet);
	PrintLine("HP: " + ddMeter + " (" + @@_DealerDamage + ")");

	var<int> remSec = ToFix(GetAddGameCreditRemFrame() / 60.0) + 1;

	var<string> mm = ZPad(ToFix(remSec / 60), 2, "0");
	var<string> ss = ZPad(      remSec % 60,  2, "0");

	SetPrint(700, 70, 70);
	PrintLine("CREDIT �t�^�܂�");
	PrintLine(mm + " : " + ss);

	SetColor("#00ffff60");
	PrintRect_XYWH(RCards_X, RCards_Y, GetPicture_W(P_TrumpFrame) + 20, GetPicture_H(P_TrumpFrame) + 20);

	SetColor("#ff800060");
	PrintRect_XYWH(WCards_X, WCards_Y, GetPicture_W(P_TrumpFrame) + 20, GetPicture_H(P_TrumpFrame) + 20);

	if (1 <= RCards.length)
	{
		Draw(P_TrumpFrame, RCards_X, RCards_Y, 1.0, 0.0, 1.0);
		Draw(P_TrumpBack,  RCards_X, RCards_Y, 1.0, 0.0, 1.0);
	}
	if (1 <= WCards.length)
	{
		@@_DBW_TopWCard_X   = Approach(@@_DBW_TopWCard_X, WCards_X, 0.85);
		@@_DBW_TopWCard_Y   = Approach(@@_DBW_TopWCard_Y, WCards_Y, 0.8);
		@@_DBW_TopWCard_Rot = Approach(@@_DBW_TopWCard_Rot, 0.0, 0.9);

		if (
			Math.abs(@@_DBW_TopWCard_X - WCards_X) < 1.0 &&
			Math.abs(@@_DBW_TopWCard_Y - WCards_Y) < 1.0 &&
			Math.abs(@@_DBW_TopWCard_Rot) < 0.001
			)
		{
			var<Trump_t> card = WCards[WCards.length - 1];
			var<Picture_t> surface = P_Trump[card.Suit][card.Number];

			Draw(P_TrumpFrame, WCards_X, WCards_Y, 1.0, 0.0, 1.0);
			Draw(surface,      WCards_X, WCards_Y, 1.0, 0.0, 1.0);
		}
		else
		{
			if (2 <= WCards.length)
			{
				var<Trump_t> card = WCards[WCards.length - 2];
				var<Picture_t> surface = P_Trump[card.Suit][card.Number];

				Draw(P_TrumpFrame, WCards_X, WCards_Y, 1.0, 0.0, 1.0);
				Draw(surface,      WCards_X, WCards_Y, 1.0, 0.0, 1.0);
			}

			{
				var<Trump_t> card = WCards[WCards.length - 1];
				var<Picture_t> surface = P_Trump[card.Suit][card.Number];

				Draw(P_TrumpFrame, @@_DBW_TopWCard_X, @@_DBW_TopWCard_Y, 1.0, @@_DBW_TopWCard_Rot, 1.0);
				Draw(surface,      @@_DBW_TopWCard_X, @@_DBW_TopWCard_Y, 1.0, @@_DBW_TopWCard_Rot, 1.0);
			}
		}
	}
}

var<boolean> @@_WTT_BackOn = false;

function* <generatorForTask> @@_E_WTT_Back()
{
	var<double> l = Screen_W - 1.0;
	var<double> r = Screen_W;

	var<Action> a_draw = () =>
	{
		SetColor("#ffffffa0");
		PrintRect_LTRB(l, Screen_H / 2 - 50, r, Screen_H / 2 + 50);
	};

	while (@@_WTT_BackOn)
	{
		l = Approach(l, 0.0, 0.77);

		a_draw();

		yield 1;
	}
	while (1.0 < r)
	{
		r = Approach(r, 0.0, 0.77);

		a_draw();

		yield 1;
	}
}

function* <generatorForTask> @@_WaitToTouch(<string> message)
{
	FreezeInput();

	@@_WTT_BackOn = true;
	AddTask(GameTasks, @@_E_WTT_Back());

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		@@_DrawBackground();
		@@_DrawBattleWall();

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);

		SetColor("#000000a0");
		SetFSize(60);
		SetPrint((Screen_W - GetPrintLineWidth(message)) / 2, Screen_H / 2 + 20, 0);

		PrintLine(message);

		yield 1;
	}
	FreezeInput();

	@@_WTT_BackOn = false;
}

var<boolean> @@_MenuBackOn = false;

function* <generatorForTask> @@_E_MenuBack()
{
	var<double> w = 0.0;

	var<Action> a_draw = () =>
	{
		SetColor("#000040c0");
		PrintRect(0.0, 0.0, w, Screen_H);
	};

	while (@@_MenuBackOn)
	{
		w = Approach(w, 900, 0.87);

		a_draw();

		yield 1;
	}
	while (1.0 < w)
	{
		w = Approach(w, 0.0, 0.93);

		a_draw();

		yield 1;
	}
}

function* <generatorForTask> @@_Menu(<string[]> items, <Action string> setReturn)
{
	var<double> ITEMS_L = 100;
	var<double> ITEMS_T = 300;
	var<double> ITEMS_Y_STEP = 350;
	var<double> ITEM_W = 700;
	var<double> ITEM_H = 200;

	FreezeInput();

	@@_MenuBackOn = true;
	AddTask(GameTasks, @@_E_MenuBack());

	var<int> selIndex = -1;

mainLoop:
	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			for (var<int> i = 0; i < items.length; i++)
			{
				if (!IsOut(
					CreateD2Point(GetMouseX(), GetMouseY()),
					CreateD4Rect(ITEMS_L, ITEMS_T + i * ITEMS_Y_STEP - ITEM_H, ITEM_W, ITEM_H),
					0.0
					))
				{
					selIndex = i;
					break mainLoop;
				}
			}
		}

		@@_DrawBackground();
		@@_DrawBattleWall();

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);

		SetPrint(ITEMS_L, ITEMS_T, ITEMS_Y_STEP);
		SetFSize(200);
		SetColor("#ffffff");

		for (var<int> i = 0; i < items.length; i++)
		{
			PrintLine(items[i]);
		}

		yield 1;
	}
	FreezeInput();

	@@_MenuBackOn = false;

	setReturn(items[selIndex]);
}

/*
	�����h�E�a���̃G�t�F�N�g

	balloon: �o���[���摜
	winner: "P" or "D"
*/
function* <generatorForTask> @@_E_MeldEffect(<Picture_t> picture, <string> winner)
{
	var<double> x;
	var<double> y;
	var<double> destX;
	var<double> destY;
	var<double> a = 1.0;
	var<double> z = 1.0;

	if (winner == "P")
	{
		x     = Screen_W / 2;
		y     = Screen_H - 300;
		destX = Screen_W / 2;
		destY = Screen_H - 600;
	}
	else if (winner == "D")
	{
		x     = Screen_W / 2;
		y     = 300;
		destX = Screen_W / 2;
		destY = 600;
	}
	else
	{
		error();
	}

	AddEffect(function* <generatorForTask> ()
	{
		while (0.01 < a)
		{
			x = Approach(x, destX, 0.93);
			y = Approach(y, destY, 0.93);

			if (GetDistanceLessThan(x - destX, y - destY, 5.0))
			{
				a = Approach(a, 0.0, 0.93);
			}

			z *= 1.01;

			Draw(picture, x, y, a, 0.0, z);

			yield 1;
		}
	}());
}

/*
	�����h����B(�|���E�`�[�E�J��)

	deck: �Ώۃf�b�L
	meldIdxs:  �����h����J�[�h�̓��A�莝���̃J�[�h�̃C���f�b�N�X�E���X�g
	meldCards: �����h����J�[�h�̓��A�O���̃J�[�h�E���X�g
*/
function <void> @@_ExecuteMeld(<Deck_t> deck, <int[]> meldIdxs, <Trump_t[]> meldCards)
{
	var<Trump_t[]> cards = [];

	for (var<int> meldIdx of meldIdxs)
	{
		cards.push(deck.Cards[meldIdx]);

		deck.Cards[meldIdx] = null;
	}
	RemoveFalse(deck.Cards);

	for (var<Trump_t> meldCard of meldCards)
	{
		cards.push(meldCard);

		AddActor(meldCard);
	}
	for (var<Trump_t> card of cards)
	{
		SetTrumpReversed(card, false);
	}
	var<Meld_t> meld = CreateMeld(cards);

	deck.Melds.push(meld);

	SortDeck(deck);
	SetDeckCardsAutoPos(deck, true, false);
}

/*
	�a������B(�����E�c��)

	deck: �Ώۃf�b�L
	ronCards: ��������ꍇ�̊O���̃J�[�h�E���X�g
	winner: "P" or "D"
*/
function* <generatorForTask> @@_E_ExecuteAgari(<Deck_t> deck, <Trump_t[]> ronCards, <stirng> winner)
{
	for (var<Trump_t> card of DealerDeck.Cards) // �f�B�[���[�̃J�[�h�E�I�[�v��
	{
		SetTrumpReversed(card, false);
	}
	for (var<Trump_t> card of ronCards)
	{
		AddActor(card);
	}
	AddElements(deck.Cards, ronCards);

	SortDeck(deck);
	SetDeckCardsAutoPos(deck, true, false);

	if (winner == "P")
	{
		@@_DealerDamage++;

		yield* @@_E_ShowResult("W");
	}
	else if (winner == "D")
	{
		@@_DealerDamage--;

		yield* @@_E_ShowResult("L");
	}
	else
	{
		error();
	}
}

var<boolean> @@_ShowResultOn = false;

function* <generatorForTask> @@_EffectYouWin()
{
	{
		var<double> x = Screen_W / 2.0;
		var<double> y = Screen_H / 2.0;
		var<double> r = GetRand3(230.0, 270.0);
		var<double> z = GetRand3(5.0, 7.0);

		for (var<Scene_t> scene of CreateScene(60))
		{
			r = Approach(r, 0.0, 0.9);
			z = Approach(z, 1.0, 0.93);

			Draw(P_YouWin, x, y, 1.0, r, z);

			yield 1;
		}
	}

	for (var<int> c = 0; c < 10; c++)
	{
		var<double> xAdd = GetRand3(-3.7, 3.7);
		var<double> yAdd = GetRand3(-3.7, 3.7);
		var<double> rAdd = GetRand3(-0.01, 0.01);
		var<double> zAdd = GetRand3(0.01, 0.07);

		AddEffect(function* <generatorForTask> ()
		{
			var<double> x = Screen_W / 2.0;
			var<double> y = Screen_H / 2.0;
			var<double> r = 0.0;
			var<double> z = 1.0;

			for (var<Scene_t> scene of CreateScene(60))
			{
				x += xAdd;
				y += yAdd;
				r += rAdd;
				z += zAdd;

				Draw(P_YouWin, x, y, 0.5 * scene.RemRate, r, z);

				yield 1;
			}
		}());
	}

	// �Ռ� >>>

	SE(S_Dooooon);

	AddEffect(function* <generatorForTask> ()
	{
//		for (var<Scene_t> scene of CreateScene(45))
//		for (var<Scene_t> scene of CreateScene(120))
		for (var<Scene_t> scene of CreateScene(180))
		{
//			var<double> r = scene.RemRate * 70.0;
//			var<double> r = scene.RemRate * 200.0;
			var<double> r = scene.RemRate * 300.0;

			DrawSlide_X = GetRand2() * r;
			DrawSlide_Y = GetRand2() * r;

			yield 1;
		}

		DrawSlide_X = 0.0;
		DrawSlide_Y = 0.0;
	}());

	// <<< �Ռ�

	while (@@_ShowResultOn)
	{
		Draw(P_YouWin, Screen_W / 2.0, Screen_H / 2.0, 1.0, 0.0, 1.0);

		yield 1;
	}

	for (var<int> c = 0; c < 5; c++)
	{
		var<double> xAdd = GetRand3(-3.7, 3.7);
		var<double> yAdd = GetRand3(-3.7, 3.7);
		var<double> rAdd = GetRand3(-0.001, 0.001);
		var<double> zAdd = GetRand3(0.01, 0.03);

		AddEffect(function* <generatorForTask> ()
		{
			var<double> x = Screen_W / 2.0;
			var<double> y = Screen_H / 2.0;
			var<double> r = 0.0;
			var<double> z = 1.0;

			for (var<Scene_t> scene of CreateScene(60))
			{
				x += xAdd;
				y += yAdd;
				r += rAdd;
				z += zAdd;

				Draw(P_YouWin, x, y, 0.5 * scene.RemRate, r, z);

				yield 1;
			}
		}());
	}
}

function* <generatorForTask> @@_EffectYouLose()
{
	var<double> x = Screen_W * 2.0;
	var<double> y = Screen_H * 0.5;
	var<double> a = 0.0;
	var<double> z = GetRand3(2.3, 2.7);

	while (@@_ShowResultOn)
	{
		x = Approach(x, Screen_W / 2.0, 0.97);
		y = Approach(y, Screen_H / 2.0, 0.98);
		a = Approach(a, 1.0, 0.96);
		z = Approach(z, 1.0, 0.99);

		Draw(P_YouLose, x, y, a, 0.0, z);

		yield 1;
	}

	for (var<Scene_t> scene of CreateScene(60))
	{
		x = Approach(x, Screen_W * -1.5, 0.99);
		y = Approach(y, Screen_H /  2.0, 0.99);
		a *= 0.95;
		z *= 1.01;

		Draw(P_YouLose, x, y, a, 0.0, z);

		yield 1;
	}
}

/*
	strResult: "W" or "L"
*/
function* <generatorForTask> GameJs_Test05(<string> strResult)
{
	@@_ShowResultOn = true;

	if (strResult == "W") // ? Win
	{
		AddEffect(@@_EffectYouWin());
	}
	else if (strResult == "L") // ? Lose
	{
		AddEffect(@@_EffectYouLose());
	}
	else
	{
		error();
	}

	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#000000");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		yield 1;
	}
	FreezeInput();

	@@_ShowResultOn = false;

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#000000");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		yield 1;
	}
	FreezeInput();
}

/*
	strResult: "W" or "L"
*/
function* <generatorForTask> @@_E_ShowResult(<string> strResult)
{
	@@_ShowResultOn = true;

	if (strResult == "W") // ? Win
	{
		AddEffect(@@_EffectYouWin());
	}
	else if (strResult == "L") // ? Lose
	{
		AddEffect(@@_EffectYouLose());
	}
	else
	{
		error();
	}

	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		@@_DrawBackground();
		@@_DrawBattleWall();

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);

		yield 1;
	}
	FreezeInput();

	@@_ShowResultOn = false;
}

/*
	�ǂݎ���̎R���`�F�b�N���A�c��[���Ȃ�̂Ă��J�[�h�����[����B
*/
function* <generatorForTask> @@_CheckRemYama()
{
	if (RCards.length == 0)
	{
		RCards = WCards;
		WCards = [];

		for (var<Trump_t> card of RCards)
		{
			SetTrumpPos_Direct(card, RCards_X, RCards_Y);
			SetTrumpReversed_Direct(card, true);
		}
		@@_ShuffleCards(RCards);

		yield* @@_WaitToTouch("�̂Ă��J�[�h���R�ɖ߂��܂����I");
	}
}

var<string> @@_SM_Message = "";
var<double> @@_SM_H = 0.0;

function <void> @@_SM_EACH()
{
	@@_SM_H = Approach(@@_SM_H, @@_SM_Message == "" ? 0.0 : 100.0, 0.85);

	if (1.0 < @@_SM_H)
	{
		SetColor("#000000c0");
		PrintRect(0, (Screen_H - @@_SM_H) / 2, Screen_W, @@_SM_H);
		SetColor("#ffffff");
		SetFSize(60);
		SetPrint((Screen_W - GetPrintLineWidth(@@_SM_Message)) / 2, Screen_H / 2 + 20, 0);
		PrintLine(@@_SM_Message);
	}
}

function <void> @@_SetMessage(<string> message)
{
	@@_SM_Message = message;
}

function <void> @@_ShuffleCards(<T[]> cards)
{
	var<int> count = ToInt(@@_Bet / 10);
	count = ToRange(count, 1, 10);
	LOGPOS();

	for (var<int> c = 0; c < count; c++)
	{
		Shuffle(cards);
		LOGPOS();
	}
	LOGPOS();
}
