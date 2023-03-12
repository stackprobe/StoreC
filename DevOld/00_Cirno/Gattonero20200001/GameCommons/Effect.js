/*
	�G�t�F�N�g
*/

var <generatorForTask[]> @@_Effects = [];

/*
	�G�t�F�N�g��ǉ�����B

	effect: �W�F�l���[�^�ł��邱�ƁB
		�W�F�l���[�^���U��Ԃ��ƏI���ƌ��Ȃ��B
*/
function <void> AddEffect(<generatorForTask> effect)
{
	@@_Effects.push(effect);
}

function <void> @(UNQN)_EACH()
{
	for (var<int> index = 0; index < @@_Effects.length; index++)
	{
		var<generatorForTask> effect = @@_Effects[index];

		if (NextVal(effect)) // ? true -> �G�t�F�N�g�p��
		{
			// noop
		}
		else // ? false -> �G�t�F�N�g�I��
		{
			@@_Effects[index] = null;
		}
	}
	RemoveFalse(@@_Effects);
}

// ���g�p
/*
function <generatorForTask[]> GetEffects()
{
	return @@_Effects;
}
*/

function <void> ClearAllEffect()
{
	@@_Effects = [];
}

// ====
// ��������֗��@�\
// ====

function <void> AddEffectDelay(<int> delayFrame, <Action> routine)
{
	AddEffect(function* <generatorForTask> ()
	{
		yield* Repeat(1, delayFrame);
		routine();
	}());
}

function <void> AddEffectKeep(<int> keepFrame, <Action> routine)
{
	AddEffect(function* <generatorForTask> ()
	{
		for (var<int> frame = 0; frame < keepFrame; frame++)
		{
			routine();
			yield 1;
		}
	}());
}
