export enum Formula {
  Bazett = 'Bazett',
  Fredericia = 'Fredericia',
  Framingham = 'Framingham',
  Hodges = 'Hodges',
}

export enum Sex {
  Male = 'Male',
  Female = 'Female',
}

export interface InterpretationResult {
  level: 'Normal' | 'Sınırda' | 'Uzamış' | 'Kısa' | 'Geçersiz';
  message: string;
  className: string;
}