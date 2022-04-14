import React, { useEffect, useState } from 'react';
import Absensi from '../../helpers/Absensi';
import { titleCard } from '../../helpers/assetHelpers';
import { Button, Card, Textarea } from '../atoms';
import GroupInputRadio from './GroupInputRadio';

export default function FormCheckin({
  handlerSubmit,
  handlerKondisi,
  state,
  setState,
  photo,
  isSubmit,
}) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <form onSubmit={handlerSubmit}>
      <Card>
        <GroupInputRadio
          title="Condition"
          data={['sehat', 'sakit', 'cuti', 'SPPD', 'izin']}
          isSelected={state.kondisi}
          handlerOnClick={handlerKondisi}
          setState={setState}
          textName="kondisi"
        />
      </Card>

      {state.kondisi === 'sehat' && (
        <>
          {/* {1 === 1 || state.is_shift > 0 ? (
            <Card>
              <GroupInputRadio
                title="Shifting"
                data={['Pagi', 'Siang', 'Malam']}
                setState={setState}
                isSelected={state.kehadiran}
                handlerOnClick={handlerKondisi}
                textName="kehadiran"
              />
            </Card>
          ) : (
            <> </>
          )} */}

          <Card>
            <GroupInputRadio
              title="Attendance"
              data={['WFH', 'WFO']}
              setState={setState}
              isSelected={state.kehadiran}
              handlerOnClick={handlerKondisi}
              textName="kehadiran"
            />
          </Card>
        </>
      )}

      {state.kondisi.length > 0 && (
        <Card>
          <Absensi shift={state.is_shift} kondisi={state.kondisi}>
            <Textarea
              labelName="Explanation"
              name="keterangan"
              value={state.keterangan}
              onChange={setState}
              placeholder={`Explanation ${
                state.kondisi === 'sehat' || state.kondisi === ''
                  ? 'Late'
                  : titleCard(state.kondisi)
              }? `}
            />
          </Absensi>
        </Card>
      )}

      <Card addClass={'mt-10'}>
        {photo &&
          (state.kehadiran || state.keterangan) &&
          state.kondisi &&
          photo && <Button type="in" value="Check In" isSubmit={isSubmit} />}
      </Card>
    </form>
  );
}
