// components/PrintableLeavePDF.tsx
 import React from "react";
 import { Leave } from "@/components/types/leave";

 interface Props {
  data: Leave;
 }

 export default function PerizinanTemplate({ data }: Props) {
  const leave = data;
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
   <div id="pdf-pages">
    {/* PAGE 1 */}
    <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "20mm", backgroundColor: "white", fontFamily: 'Arial' }}>
     {/* Header */}
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div>
       <div style={{ fontSize: '20px', fontWeight: 'bold' }}>AOY</div>
       <div style={{ fontSize: '10px' }}>AT'S ON YOU</div>
      </div>
      <div style={{ textAlign: 'center' }}>
       <div style={{ fontSize: '24px', fontWeight: 'bold' }}>ADDAYA</div>
       <div style={{ fontSize: '18px', fontWeight: 'bold' }}>HOLDING COMPANY</div>
      </div>
      <div>
       <div style={{ fontSize: '14px' }}>Consultant</div>
      </div>
     </div>

     {/* Form Title */}
     <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>FORMULIR TUGAS / PERJALANAN DINAS</h2>
     </div>

     {/* Section 1: Saya yang bertanda tangan dibawah ini */}
   <div style={{ marginBottom: '15px' }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '12px' }}>Saya yang bertanda tangan dibawah ini :</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Nama</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}>{leave.user.profile?.full_name || ""}</div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Divisi</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}>{leave.user.department?.name || ""}</div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Jabatan</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}>{leave.user?.position.name || ""}</div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Business Units</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
      </div>
     </div>

     {/* Section 2: Menugaskan kepada */}
     <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '12px' }}>Menugaskan kepada :</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Nama</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Divisi</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Jabatan</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Tugas dalam rangka</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}>{leave.description}</div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Hari/Tanggal</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}>
         {leave.start_date ? new Date(leave.start_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ""}
         {leave.end_date && leave.start_date !== leave.end_date ? ` - ${new Date(leave.end_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
        </div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Pukul</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Tempat</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Pengajuan Dana</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Pengajuan Kendaraan</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
       <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100px', fontSize: '12px', paddingRight: '5px', textAlign: 'right' }}>Operasional</div>
        <div style={{ margin: '0 5px', fontSize: '12px' }}>:</div>
        <div style={{ borderBottom: '1px solid black', flexGrow: 1, fontSize: '12px', paddingBottom: '2px' }}></div>
       </div>
      </div>
     </div>

     {/* Form Description */}
     <div style={{ marginBottom: '20px', fontSize: '12px', textAlign: 'justify' }}>
      Demikian formulir tugas dinas ini diberikan agar dapat dilaksanakan dengan penuh tanggung jawab serta selesai melaksanakan wajib untuk menyerahkan laporan tertulis kepada pimpinan.
     </div>

     {/* Approval Section */}
     <div style={{ marginBottom: '15px', fontSize: '12px' }}>
      <div style={{ marginBottom: '10px' }}>Tangerang, {new Date(leave.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
       <thead>
        <tr>
         <th style={{ width: '33.33%', border: '1px solid black', padding: '8px', textAlign: 'center' }}>Diajukan oleh,</th>
         <th style={{ width: '33.33%', border: '1px solid black', padding: '8px', textAlign: 'center' }}>Disetujui oleh,</th>
         <th style={{ width: '33.33%', border: '1px solid black', padding: '8px', textAlign: 'center' }}>Diketahui oleh</th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>Karyawan</div>
          <div style={{ borderTop: '1px solid black', width: '80%', margin: '0 auto' }}></div>
         </td>
         <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>Atasan Langsung</div>
          <div style={{ borderTop: '1px solid black', width: '80%', margin: '0 auto' }}></div>
         </td>
         <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
           <div style={{ marginBottom: '40px' }}>Human Capital</div>
           <div style={{ borderTop: '1px solid black', width: '80%', margin: '0 auto' }}></div>
           <div style={{ marginBottom: '40px' }}>Finance</div>
           <div style={{ borderTop: '1px solid black', width: '80%', margin: '0 auto' }}></div>
          </div>
         </td>
        </tr>
       </tbody>
      </table>
     </div>

     {/* Important Note */}
     <div style={{ fontSize: '10px', color: 'red', textAlign: 'center', marginBottom: '10px' }}>
      Karyawan yang tidak membuat dan melengkapi formulir ini akan dianggap Mangkir / Meninggalkan Jam Kerja, dan diterapkan konsekuensi pemotongan Upah.
     </div>

     {/* Footer */}
     <div style={{ fontSize: '9px', textAlign: 'center', color: '#555' }}>
      Head Office : FORESTA BUSINESS LOFT 5 Unit 31, BSD CITY, Lengkong Kulon, Kecamatan Pagedangan, Kabupaten Tangerang, Banten, 15331
      <br />
      021-50102367
     </div>
    </div>

    {/* PAGE 2 */}
    <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "20mm", backgroundColor: "white", fontFamily: 'Arial' }}>
     {/* Header */}
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div>
       <div style={{ fontSize: '20px', fontWeight: 'bold' }}>AOY</div>
       <div style={{ fontSize: '10px' }}>AT'S ON YOU</div>
      </div>
      <div style={{ textAlign: 'center' }}>
       <div style={{ fontSize: '24px', fontWeight: 'bold' }}>ADDAYA</div>
       <div style={{ fontSize: '18px', fontWeight: 'bold' }}>HOLDING COMPANY</div>
      </div>
      <div>
       <div style={{ fontSize: '14px' }}>Consultant</div>
      </div>
     </div>

     {/* Section: Ditempat tujuan oleh PIC */}
     <div style={{ marginBottom: '20px', fontSize: '12px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Ditempat tujuan oleh PIC</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
       <tbody>
        <tr>
         <td style={{ width: '50%', border: '1px solid black', padding: '8px' }}>
          Berangkat dari :
          <div style={{ marginBottom: '10px' }}>Tanggal : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '70%' }}></span></div>
          <div style={{ marginBottom: '20px' }}>Tanda tangan PIC dan cap instansi : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '60%' }}></span></div>
         </td>
         <td style={{ width: '50%', border: '1px solid black', padding: '8px' }}>
          Tiba di :
          <div style={{ marginBottom: '10px' }}>Tanggal : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '70%' }}></span></div>
          <div style={{ marginBottom: '20px' }}>Tanda tangan PIC dan cap instansi : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '60%' }}></span></div>
         </td>
        </tr>
        <tr>
         <td style={{ width: '50%', border: '1px solid black', padding: '8px' }}>
          Berangkat dari :
          <div style={{ marginBottom: '10px' }}>Tanggal : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '70%' }}></span></div>
          <div style={{ marginBottom: '20px' }}>Tanda tangan PIC dan cap instansi : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '60%' }}></span></div>
         </td>
         <td style={{ width: '50%', border: '1px solid black', padding: '8px' }}>
          Tiba di :
          <div style={{ marginBottom: '10px' }}>Tanggal : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '70%' }}></span></div>
          <div style={{ marginBottom: '20px' }}>Tanda tangan PIC dan cap instansi : <span style={{ borderBottom: '1px solid black', display: 'inline-block', width: '60%' }}></span></div>
         </td>
        </tr>
       </tbody>
      </table>
     </div>

     {/* Section: Laporan Perjalanan Dinas */}
     <div style={{ fontSize: '12px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Laporan Perjalanan Dinas :</div>
      <div style={{ border: '1px solid black', padding: '8px', minHeight: '150px', whiteSpace: 'pre-wrap' }}>
       {leave.description}
      </div>
     </div>

     {/* Footer */}
     <div style={{ fontSize: '9px', textAlign: 'center', color: '#555', marginTop: '20px' }}>
      Head Office : FORESTA BUSINESS LOFT 5 Unit 31, BSD CITY, Lengkong Kulon, Kecamatan Pagedangan, Kabupaten Tangerang, Banten, 15331
      <br />
      021-50102367
     </div>
    </div>
   </div>
  );
 }