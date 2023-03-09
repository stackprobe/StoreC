/*
	�f�b�L
*/

/@(ASTR)

/// Deck_t
{
	// �莝���̃J�[�h�E���X�g
	<Trump_t[]> Cards

	// �����h�E���X�g
	<Meld_t[]> Melds

	// �莝���̃J�[�h�̕`��ʒu(������W)
	<double> CardsDraw_L
	<double> CardsDraw_T

	// �����h�����J�[�h�̕`��ʒu(������W)
	<double> MeldsDraw_L
	<double> MeldsDraw_T
}

@(ASTR)/

/*
	cardsDrawTop: �莝���̃J�[�h�̕`��ʒu(��ӂ�Y-���W)
	meldsDrawTop: �����h�����J�[�h�̕`��ʒu(��ӂ�Y-���W)
*/
function <Deck_t> CreateDeck(<double> cardsDrawTop, <double> meldsDrawTop)
{
	var<Deck_t> ret =
	{
		Cards: [],
		Melds: [],

		CardsDraw_L: 0,
		CardsDraw_T: cardsDrawTop,

		MeldsDraw_L: 0,
		MeldsDraw_T: meldsDrawTop,
	};

	return ret;
}

function <Trump_t[]> GetDeckCards(<Deck_t> deck)
{
	return deck.Cards;
}

function <Meld_t[]> GetDeckMelds(<Deck_t> deck)
{
	return deck.Melds;
}

function <void> SetDeckCardsAutoPos(<Deck_t> deck, <boolean> ��u��, <boolean> ��]����)
{
	var<int> delayFrame = 0;

	{
		var<double> l = deck.CardsDraw_L + GetPicture_W(P_TrumpFrame) / 2 + 10;
		var<double> t = deck.CardsDraw_T + GetPicture_H(P_TrumpFrame) / 2;
		var<double> w = Screen_W - GetPicture_W(P_TrumpFrame) - 20;

		for (var<int> c = 0; c < deck.Cards.length; c++)
		{
			var<Trump_t> card = deck.Cards[c];

			var<double> x = l + (c / Math.max(1, deck.Cards.length - 1)) * w;
			var<double> y = t;

			if (��u��)
			{
				SetTrumpPos(card, x, y);

				if (��]����)
				{
					SetTrumpAutoStRot(card);
				}
			}
			else
			{
				AddDelay(GameTasks, delayFrame, () =>
				{
					SetTrumpPos(card, x, y);

					if (��]����)
					{
						SetTrumpAutoStRot(card);
					}
				});

				delayFrame += 5;
			}
		}
	}

	{
		var<double> X_STEP = 50.0;

		var<double> x = deck.MeldsDraw_L + GetPicture_W(P_TrumpFrame) / 2 + 10;
		var<double> y = deck.MeldsDraw_T + GetPicture_H(P_TrumpFrame) / 2;

		for (var<Meld_t> meld of deck.Melds)
		{
			for (var<Trump_t> card of meld.Cards)
			{
				if (��u��)
				{
					SetTrumpPos(card, x, y);

					if (��]����)
					{
						SetTrumpAutoStRot(card);
					}
				}
				else
				{
					AddDelay(GameTasks, delayFrame, () =>
					{
						SetTrumpPos(card, x, y);

						if (��]����)
						{
							SetTrumpAutoStRot(card);
						}
					});

					delayFrame += 5;
				}
				x += X_STEP;
			}
			x += X_STEP;
		}
	}
}

function <void> SortDeck(<Deck_t> deck)
{
	var<Func Trump_t Trump_t int> comp = (a, b) =>
	{
		var<int> ret = a.Number - b.Number;

		if (ret != 0)
			return ret;

		ret = a.Suit - b.Suit;

		if (ret != 0)
			return ret;

		error(); // never
	};

	deck.Cards.sort(comp);

	for (var<Meld_t> meld of deck.Melds)
	{
		meld.Cards.sort(comp);
	}
}
