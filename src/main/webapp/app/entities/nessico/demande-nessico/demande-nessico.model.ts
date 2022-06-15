import dayjs from 'dayjs/esm';

export interface IDemandeNessico {
  id?: number;
  nomApp?: string | null;
  password?: string | null;
  action?: string | null;
  status?: string | null;
  message?: string | null;
  dateDemande?: dayjs.Dayjs | null;
  dateRetour?: dayjs.Dayjs | null;
  user?: string | null;
}

export class DemandeNessico implements IDemandeNessico {
  constructor(
    public id?: number,
    public nomApp?: string | null,
    public password?: string | null,
    public action?: string | null,
    public status?: string | null,
    public message?: string | null,
    public dateDemande?: dayjs.Dayjs | null,
    public dateRetour?: dayjs.Dayjs | null,
    public user?: string | null
  ) {}
}

export function getDemandeNessicoIdentifier(demandeNessico: IDemandeNessico): number | undefined {
  return demandeNessico.id;
}
