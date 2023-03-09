/*
	���[�J���E�X�g���[�W (�擾�Ɛݒ�)
*/

function <string> GetLocalStorageValue(<string> name, <string> defval)
{
	var<string> value = window.localStorage.getItem(name);

	if (value == null)
	{
		value = defval;
	}
	return value;
}

function <void> SetLocalStorageValue(<string> name, <string> value)
{
	window.localStorage.setItem(name, value);
}

function <void> ClearLocalStorageValue()
{
	window.localStorage.clear();
}
