import dayjs from 'dayjs/esm';

export interface IDemandeOracle {
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

export class DemandeOracle implements IDemandeOracle {
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

export function getDemandeOracleIdentifier(demandeOracle: IDemandeOracle): number | undefined {
  return demandeOracle.id;
}
