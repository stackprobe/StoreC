/*
	�A�N�^�[ - Trump (�g�����v�̃J�[�h)
*/

var<int> ActorKind_Trump = @(AUTO);

/*
	(x, y): �����ʒu
	suit: �G���̃X�[�g
	number: �G���̐��� (1�`13)
	reversed: ���Ԃ��Ă��邩
*/
function <Trump_t> CreateActor_Trump(<double> x, <double> y, <Suit_e> suit, <int> number, <boolean> reversed)
{
	/// Trump_t : Actor_t
	var ret =
	{
		Kind: ActorKind_Trump,
		X: x,
		Y: y,
		Crash: null,
		Killed: false,

		// ��������ŗL

		<double> Dest_X: x,
		<double> Dest_Y: y,

		<Suit_e> Suit: suit,  // �G���̃X�[�g
		<int> Number: number, // �G���̐��� (1�`13)
		<boolean> Reversed: reversed,
		<generatorForTask> SpecialDraw: ToGenerator([]),

		<double> Rot: 0.0,
	};

	ret.Draw = @@_Draw(ret);

	return ret;
}

var<double> @@_PICTURE_Z = 1.0;

function* <generatorForTask> @@_Draw(<Trump_t> actor)
{
	for (; ; )
	{
		actor.X = Approach(actor.X, actor.Dest_X, 0.9);
		actor.Y = Approach(actor.Y, actor.Dest_Y, 0.9);

		actor.Rot = Approach(actor.Rot, 0.0, 0.85);

		if (!NextVal(actor.SpecialDraw))
		{
			var<Picture_t> surface;

			if (actor.Reversed)
			{
				surface = P_TrumpBack;
			}
			else
			{
				surface = P_Trump[actor.Suit][actor.Number];
			}

			Draw(P_TrumpFrame, actor.X, actor.Y, 1.0, actor.Rot, @@_PICTURE_Z);
			Draw(surface,      actor.X, actor.Y, 1.0, actor.Rot, @@_PICTURE_Z);
		}

		yield 1;
	}
}

function <void> SetTrumpPos_Direct(<Trump_t> actor, <double> x, <double> y)
{
	actor.X = x;
	actor.Y = y;

	actor.Dest_X = x;
	actor.Dest_Y = y;
}

function <void> SetTrumpPos(<Trump_t> actor, <double> x, <double> y)
{
	actor.Dest_X = x;
	actor.Dest_Y = y;
}

function <boolean> IsTrumpReversed(<Trump_t> actor)
{
	return actor.Reversed;
}

function <void> SetTrumpReversed_Direct(<Trump_t> actor, <boolean> reversed)
{
	actor.SpecialDraw = ToGenerator([]);
	actor.Reversed = reversed;
}

function <void> SetTrumpReversed(<Trump_t> actor, <boolean> reversed)
{
	if (actor.Reversed ? !reversed : reversed)
	{
		actor.SpecialDraw = @@_Turn(actor, reversed);
		actor.Reversed = reversed;
	}
}

function* <generatorForTask> @@_Turn(<Trump_t> actor, <boolean> reversed)
{
	for (var<Scene_t> scene of CreateScene(30))
	{
		var<double> wRate = Math.cos(scene.Rate * Math.PI);
		var<boolean> b = !reversed;

		if (wRate < 0.0)
		{
			wRate *= -1.0;
			b = !b;
		}

		if (MICRO < wRate)
		{
			var<Picture_t> surface;

			if (b)
			{
				surface = P_TrumpBack;
			}
			else
			{
				surface = P_Trump[actor.Suit][actor.Number];
			}

			Draw2(P_TrumpFrame, actor.X, actor.Y, 1.0, actor.Rot, wRate, @@_PICTURE_Z);
			Draw2(surface,      actor.X, actor.Y, 1.0, actor.Rot, wRate, @@_PICTURE_Z);
		}

		yield 1;
	}
}

function <void> SetTrumpAutoStRot(<Trump_t> actor) // ��]�J�n���Z�b�g����B
{
	SetTrumpStRot(actor, GetRand2() * 20.0);
}

function <void> SetTrumpStRot(<Trump_t> actor, <double> rot)
{
	actor.Rot = rot;
}
