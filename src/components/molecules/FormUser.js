import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllEmployee,
  insertEmployee,
  updateEmployee,
} from '../../redux/actions/employee';
import { ButtonCustom, Input, Select, Toggle } from '../atoms';

export default function FormUser({
  dataTemp,
  handlerModal,
  handlerErrValidation,
  handlerFilterData,
}) {
  const dispatch = useDispatch();
  const [isAdmin, setisAdmin] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const USER = useSelector((state) => state.user);
  const REGIONAL = useSelector((state) => state.regional);
  const WITEL = useSelector((state) => state.witel);

  //   ========= List Params Dropdown =========
  const [formDropdown, setformDropdown] = useState({
    role_id: '',
    regional_id: '',
    witel_id: '',
    posisi: '',
  });

  //   ========= List Params Input Text =========
  const [formData, setformData] = useState({
    name: '',
    nik: '',
    phone: '',
    email: '',
  });

  //   ========= Handler Function Onchange Dropdown =========
  const handlerChangeDropdown = (event) => {
    setformDropdown({
      ...formDropdown,
      [event.target.name]: event.target.value,
    });
  };

  //   ========= Handler Function Onchange Input  =========
  const handlerChangeInput = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //   ========= Handler Function Insert User =========
  const insertDataUser = async (form) => {
    setisSubmit(true);
    try {
      const result = await dispatch(insertEmployee(form));
      if (result?.status === 200) {
        handlerModal(false);
        dispatch(fetchAllEmployee()).then((res) => {
          handlerFilterData(res.data);
        });
      }
      setisSubmit(false);
    } catch (error) {
      setisSubmit(false);
      handlerErrValidation(error?.response?.data?.message);
    }
  };

  //   ========= Handler Function Update User =========
  const updateUser = async (form) => {
    setisSubmit(true);
    try {
      const result = await dispatch(updateEmployee(dataTemp?.data?.id, form));
      if (result?.status === 200) {
        handlerModal(false);
        dispatch(fetchAllEmployee()).then((res) => {
          handlerFilterData(res.data);
        });
      } else {
        handlerErrValidation(result?.data?.message);
      }
      setisSubmit(false);
    } catch (error) {
      return true;
    }
  };

  //   ========= Handler Function On SUbmit =========
  const handlerSubmit = async (event) => {
    event.preventDefault();
    let form = {
      ...formData,
      ...formDropdown,
      is_admin: isAdmin,
    };
    if (dataTemp.type === 'add') {
      return await insertDataUser(form);
    }

    if (dataTemp.type === 'update') {
      return await updateUser(form);
    }
  };

  useEffect(() => {
    if (dataTemp?.data !== undefined) {
      //   set value data user selected to form input
      Object.entries(dataTemp.data).map((item, index) =>
        Object.entries(formData).map((list) => {
          if (list[0] === item[0]) {
            formData[list[0]] = item[1] ?? '';
          }
          return true;
        }),
      );

      //   set value data user selected to form dropdown
      Object.entries(dataTemp?.data).map((item, index) =>
        Object.entries(formDropdown).map((list) => {
          if (list[0] !== 'password') {
            if (list[0] === item[0]) {
              formDropdown[list[0]] = item[1] ?? '';
            }
          }
          return true;
        }),
      );
      // set value is admin from data temp
      setisAdmin(dataTemp.data.is_admin === 1 ? true : false);
    }

    const timeout = setTimeout(() => {
      setisLoading(true);
    }, 400);

    return () => {
      clearInterval(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {!isLoading ? (
        ''
      ) : (
        <form onSubmit={handlerSubmit} className="relative">
          {/* Form IsAdmin */}
          {String(USER?.profile?.role_id) === '3' && dataTemp.type !== 'view' && (
            <div className="relative mb-3 text-left">
              <label
                className="block text-sm text-zinc-600 capitalize mb-2"
                htmlFor="isAdmin">
                Admin
              </label>
              <Toggle isTrue={isAdmin} handlerTrue={setisAdmin} />
            </div>
          )}

          {/* Form Role  */}
          <Select
            isDisabled={dataTemp.type !== 'add'}
            name="role_id"
            labelName="Role"
            onchange={dataTemp.type === 'add' ? handlerChangeDropdown : null}
            value={formDropdown.role_id}>
            <option value="1">Technician</option>
            <option value="2">Manager</option>
            <option value="3">Leader</option>
          </Select>

          {formDropdown.role_id !== '' && formDropdown.role_id !== '3' ? (
            <>
              {/* Form Regional  */}
              <Select
                isDisabled={dataTemp.type === 'view'}
                addClassParent={'mt-3'}
                name="regional_id"
                labelName="Regional"
                value={formDropdown.regional_id}
                onchange={handlerChangeDropdown}>
                {REGIONAL?.listRegional?.length > 0 &&
                  REGIONAL?.listRegional
                    ?.filter((id) => id.alias !== 'ALL TREG')
                    .map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.alias}
                      </option>
                    ))}
              </Select>

              {formDropdown.role_id !== '' &&
              formDropdown.role_id === '1' &&
              formDropdown.regional_id !== '' ? (
                <>
                  <Select
                    isDisabled={dataTemp.type === 'view'}
                    addClassParent={'mt-3'}
                    name="witel_id"
                    labelName="Witel"
                    onchange={handlerChangeDropdown}
                    value={formDropdown.witel_id}>
                    {WITEL?.allWitel?.length > 0 &&
                      WITEL?.allWitel.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.alias}
                        </option>
                      ))}
                  </Select>

                  {/* Form Posisi  */}
                  <Select
                    isDisabled={dataTemp.type === 'view'}
                    addClassParent={'mt-3'}
                    name="posisi"
                    labelName="Posisi">
                    <option value="Helpdesk">Helpdesk TDM</option>
                    <option value="Teknisi">Teknisi TDM</option>
                  </Select>
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}

          {/* Form Input Text */}
          {Object.entries(formData).map((item, index) => (
            <Input
              label={item[0] === 'nik' ? 'NIK' : item[0]}
              addClassParent="mt-3"
              disabled={dataTemp.type === 'view'}
              onchange={(e) => handlerChangeInput(e)}
              autoComplete={'off'}
              key={index}
              value={formData[item[0]]}
              name={item[0]}
              note={item[0] === 'phone' ? 'Format number must 812xxx ' : ''}
            />
          ))}

          {dataTemp?.type !== 'view' && (
            <ButtonCustom
              isSubmit={isSubmit}
              type={dataTemp?.type === 'add' ? 'in' : 'edit'}
              moreClass={'capitalize mt-4'}>
              {dataTemp.type} Employee
            </ButtonCustom>
          )}
        </form>
      )}
    </div>
  );
}
