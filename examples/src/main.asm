SECTION  "Vblank", ROM0[$0040]
  reti
SECTION  "LCDC", ROM0[$0048]
  reti
SECTION  "Timer_Overflow", ROM0[$0050]
  reti
SECTION  "Serial", ROM0[$0058]
  reti
SECTION  "p1thru4", ROM0[$0060]
  reti

; Point-of-entry
SECTION  "start", ROM0[$0100]
  nop
  jp main

INCLUDE "header.inc"


SECTION "main", ROMX

; Memory addresses for various things
pVRAM_TILES_SPRITE EQU $8000
pOAM EQU $fe00
pLCD_CTRL EQU $ff40
pLCD_BG_PAL EQU $ff47
pOBJ0_PAL EQU $ff48
pOBJ1_PAL EQU $ff49


ship_tile_data_size EQU $40 * 4

main::
.lcd_off:
  ld HL, pLCD_CTRL
  res 7, [HL]

.lcd_config:
  ; Reset OBJ (Sprite) Display (0: off)
  set 1, [HL]

.clear_oam:
  xor a
  ld hl, pOAM
  ld bc, $A0 ; the full size of the OAM area: 40 bytes, 4 bytes per sprite
  call mem_set

.load_palettes:
  ; Set palettes
  ld hl, pLCD_BG_PAL
  LD [hl], %11100100
  ld hl, pOBJ0_PAL
  ld [hl], %11100100
  ld hl, pOBJ1_PAL
  ld [hl], %11100100

.load_sprite_tiles:
  ld de, ship_tile_data_size ;len
  ld bc, ship_tile_data ;src
  ld hl, $81a0 ;dest
  call memcpy

load_sprites_oam::
  ld b, $3f
  ld c, $3f

.bulbasaur:
  ld hl, pOAM
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $1a; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $04
  ld e, c
  ld a, c
  adc a, 8
  ld c, a
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $1b; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $0c
  ld a, b
  adc a, 8
  ld b, a
  ld [hl], b
  inc l
  ld [hl], e
  inc l
  ld [hl], $1c; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $08
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $1d; tile number
  inc l
  ld [hl], $0 ; flag

.creature:
  ld b, $3f
  ld c, $4f

  ld hl, pOAM + $10
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $1e; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $10 + $04
  ld e, c
  ld a, c
  adc a, 8
  ld c, a
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $1f; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $10 + $0c
  ld a, b
  adc a, 8
  ld b, a
  ld [hl], b
  inc l
  ld [hl], e
  inc l
  ld [hl], $20; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $10 + $08
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $21; tile number
  inc l
  ld [hl], $0 ; flag

.oddish:
  ld b, $3f
  ld c, $5f

  ld hl, pOAM + $20
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $22; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $20 + $04
  ld e, c
  ld a, c
  adc a, 8
  ld c, a
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $23; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $20 + $0c
  ld a, b
  adc a, 8
  ld b, a
  ld [hl], b
  inc l
  ld [hl], e
  inc l
  ld [hl], $24; tile number
  inc l
  ld [hl], $0 ; flag

  ld hl, pOAM + $20 + $08
  ld [hl], b
  inc l
  ld [hl], c
  inc l
  ld [hl], $25; tile number
  inc l
  ld [hl], $0 ; flag


.lcd_on:
  ld HL, pLCD_CTRL
  set 7, [HL]

.loop:
  nop
  jr .loop

; Memcpy implementation for Z80.
; From https://github.com/bitnenfer/flappy-boy-asm
;
; de - block size
; bc - source address
; hl - destination address
memcpy::
  dec DE
.memcpy_loop:
  ld A, [BC]
  ld [HL], A
  inc BC
  inc HL
  dec DE
.memcpy_check_limit:
  ld A, E
  cp $00
  jr nz, .memcpy_loop
  ld A, D
  cp $00
  jr nz, .memcpy_loop
  ret

; Set a memory region to a value.
; From GBHW.INC - Gameboy Hardware definitions for GALP.
;
; a - value
; hl - pMem
; bc - bytecount
;
mem_set::
	inc	b
	inc	c
	jr	.skip
.loop	ld	[hl+],a
.skip	dec	c
	jr	nz,.loop
	dec	b
	jr	nz,.loop
	ret

ship_tile_data:
  DB $01, $01, $03, $02, $0f, $0e, $1f, $12, $3f, $24, $3f, $28, $7f, $58, $47, $7c
  DB $80, $80, $c0, $40, $f0, $70, $f8, $48, $fc, $24, $fc, $14, $fe, $1a, $e2, $3e
  DB $53, $7f, $50, $7f, $ac, $ff, $ae, $f7, $a6, $ff, $50, $7f, $4c, $7f, $33, $33
  DB $ca, $fe, $0a, $fe, $35, $ff, $75, $ef, $65, $ff, $0a, $fe, $32, $fe, $cc, $cc
  DB $01, $01, $7f, $7e, $71, $4e, $30, $2f, $14, $1f, $27, $3e, $20, $3f, $1d, $1e
  DB $80, $80, $fe, $7e, $8e, $72, $0c, $f4, $28, $f8, $e4, $7c, $04, $fc, $b8, $78
  DB $0f, $0b, $17, $1c, $2b, $3f, $48, $7f, $3b, $3c, $17, $1e, $17, $1b, $0e, $0e
  DB $f0, $d0, $e8, $38, $d4, $fc, $12, $fe, $dc, $3c, $e8, $78, $e8, $d8, $70, $70
  DB $31, $31, $4a, $7b, $46, $7f, $22, $3f, $22, $3f, $11, $1f, $0f, $0f, $1f, $1f
  DB $8c, $8c, $52, $de, $62, $fe, $44, $fc, $44, $fc, $88, $f8, $f0, $f0, $f8, $f8
  DB $3f, $3f, $7f, $7d, $ff, $ff, $ff, $ff, $7f, $7f, $08, $08, $08, $08, $1c, $1c
  DB $fc, $fc, $fe, $be, $ff, $ff, $ff, $ff, $fe, $fe, $10, $10, $10, $10, $38, $38
