/*
	���ʉ��ǂݍ���
*/

/@(ASTR)

/// SE_t
{
	<Sound_t[]> Handles // �n���h���̃��X�g
	<int> Index // ���ɍĐ�����n���h���̈ʒu
}

@(ASTR)/

/*
	���ʉ�
	SE()�֐��ɓn���B
*/
function <SE_t> LoadSE(<string> url)
{
	var<SE_t> ret =
	{
		Handles:
		[
			LoadSound(url), // 1
			LoadSound(url), // 2
			LoadSound(url), // 3
			LoadSound(url), // 4
			LoadSound(url), // 5
		],

		Index: 0,
	};

	return ret;
}
