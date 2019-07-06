declare namespace Enron {
  interface EnronEmail {
    DocumentID: string;
    FamilyID: string;
    'Page Count': string;
    Custodian: string;
    'Email Subject': string;
    Filename: string;
    MasterDate: string | number;


    MailstoreName: string;
    FROM: string;
    TO: string;
    CC: string;
  }
}