import { ReactElement, ReactNode } from 'react';
import { IApplicationResponse } from '../../common/models/response/ApplicationResponse';

export type TypeTable = {
 applications?: IApplicationResponse[],
 setApplications?: (applications: IApplicationResponse[]) => void,
};

export type FadeProps = {
 children: ReactElement,
 in?: boolean,
 onClick?: any, 
 onEnter?: (node: HTMLElement, isAppearing: boolean) => void,
 onExited?: (node: HTMLElement, isAppearing: boolean) => void,
 ownerState?: any,
};

export type TypeModal = {
 isOpen: boolean,
 setOpen: (value: boolean) => void,
 children?: ReactNode,
};