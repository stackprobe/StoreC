/*
	�N���W�b�g
*/

// �ǉ��N���W�b�g
var<int> @@_CREDIT_ADD = 100;

// �N���W�b�g�ǉ�����
var<int> @@_PERIDO_FRAME = 180 * 60;

// �N���W�b�g�ǉ��܂�
var<int> @@_RemFrame = @@_PERIDO_FRAME;

function <void> @(UNQN)_EACH()
{
	@@_RemFrame--;

	if (@@_RemFrame <= 0)
	{
		AddGameCredit(@@_CREDIT_ADD);
		@@_RemFrame = @@_PERIDO_FRAME;
	}
}

function <int> GetAddGameCreditRemFrame()
{
	return @@_RemFrame;
}
