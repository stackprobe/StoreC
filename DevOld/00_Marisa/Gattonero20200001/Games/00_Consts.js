/*
	�萔
*/

/*
	�}�b�v�T�C�Y (�c�E���}�b�v�Z����)

	�ȉ��̂Ƃ���ɂȂ�悤�ɂ���I
	-- Screen_W == MAP_W_MIN * TILE_W
	-- Screen_H == MAP_H_MIN * TILE_H
*/
var<int> MAP_W_MIN = 25;
var<int> MAP_H_MIN = 19;

/*
	�}�b�v�Z���E�T�C�Y (�h�b�g�P�ʁE��ʏ�̃T�C�Y)
*/
var<int> TILE_W = 32;
var<int> TILE_H = 32;

// ----
// �v���C���[��񂱂�����
// ----

var<int> PLAYER_HP_MAX = 10;

var<int> PLAYER_DAMAGE_FRAME_MAX = 5;
var<int> PLAYER_INVINCIBLE_FRAME_MAX = 60;

/*
	�v���C���[�L�����N�^�̑��x
*/
var<double> PLAYER_SPEED = 4.0;

/*
	�v���C���[�L�����N�^�̒ᑬ�ړ����̑��x
*/
var<double> PLAYER_SLOW_SPEED = 2.0;

// ----
// �v���C���[��񂱂��܂�
// ----

/// GameEndReason_e
//
var<int> GameEndReason_e_STAGE_CLEAR = @(AUTO);
var<int> GameEndReason_e_RETURN_MENU = @(AUTO);
