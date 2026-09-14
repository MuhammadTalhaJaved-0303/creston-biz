#!/bin/sh
# Slice a tall screenshot into viewable parts: slice.sh <in.png> <outprefix> <sliceHeight>
IN=$1; OUT=$2; SH=${3:-1800}
H=$(sips -g pixelHeight "$IN" | tail -1 | awk '{print $2}'); W=$(sips -g pixelWidth "$IN" | tail -1 | awk '{print $2}')
N=$(( (H + SH - 1) / SH ))
i=0; while [ $i -lt $N ]; do OFF=$((i*SH)); CH=$SH; [ $((OFF+CH)) -gt $H ] && CH=$((H-OFF))
  sips -c $CH $W --cropOffset $OFF 0 "$IN" --out "${OUT}-$(printf %02d $i).png" >/dev/null 2>&1
  i=$((i+1)); done
echo "$N slices of ${W}x${SH}"
