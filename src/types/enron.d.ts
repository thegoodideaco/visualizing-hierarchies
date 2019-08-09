declare namespace Enron {
  interface EnronEmailOld {
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

  interface EnronEmail {
    from: string;
    to: string;
    subject: string;
    date: string;
    domain: string;
  }
}