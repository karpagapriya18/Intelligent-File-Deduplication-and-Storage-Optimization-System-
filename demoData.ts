import { Analytics, DuplicateGroup, FileItem } from "./types/api";

export const demoFiles: FileItem[] = [
  {
    id: 101,
    original_filename: "project-report-final.pdf",
    content_type: "application/pdf",
    size_bytes: 4280000,
    status: "hashed",
    is_protected: true,
    uploaded_at: "2026-10-09T09:15:00",
    sha256: "b70c3fdd9f8b1ec128a0e9bfb138f8460d9f92eafc56081b2ed4ab16ec9c7001",
    is_duplicate: false
  },
  {
    id: 102,
    original_filename: "project-report-copy.pdf",
    content_type: "application/pdf",
    size_bytes: 4280000,
    status: "hashed",
    is_protected: false,
    uploaded_at: "2026-10-09T09:18:00",
    sha256: "b70c3fdd9f8b1ec128a0e9bfb138f8460d9f92eafc56081b2ed4ab16ec9c7001",
    is_duplicate: true
  },
  {
    id: 103,
    original_filename: "invoice-backup.xlsx",
    content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size_bytes: 1320000,
    status: "hashed",
    is_protected: false,
    uploaded_at: "2026-10-09T10:04:00",
    sha256: "3d28c12d9aa1e2ecdb87e772422ce0238adfd9d548e8c89014cf4c9e6a76aa20",
    is_duplicate: true
  },
  {
    id: 104,
    original_filename: "team-photo.png",
    content_type: "image/png",
    size_bytes: 6120000,
    status: "hashed",
    is_protected: false,
    uploaded_at: "2026-10-09T10:22:00",
    sha256: "5a6bd92c8e3d5fd3f2f911ee97e5a0e64003125f713d8fe0adf44e30893d4025",
    is_duplicate: false
  },
  {
    id: 105,
    original_filename: "archive-video.mp4",
    content_type: "video/mp4",
    size_bytes: 18800000,
    status: "processing",
    is_protected: false,
    uploaded_at: "2026-10-09T10:40:00",
    sha256: null,
    is_duplicate: false
  }
];

export const demoDuplicateGroups: DuplicateGroup[] = [
  {
    group_id: 501,
    original_file: {
      id: 101,
      original_filename: "project-report-final.pdf",
      size_bytes: 4280000,
      uploaded_at: "2026-10-09T09:15:00",
      is_protected: true
    },
    duplicate_files: [
      {
        id: 102,
        original_filename: "project-report-copy.pdf",
        size_bytes: 4280000,
        uploaded_at: "2026-10-09T09:18:00",
        is_protected: false
      },
      {
        id: 106,
        original_filename: "old-report-download.pdf",
        size_bytes: 4280000,
        uploaded_at: "2026-10-08T17:44:00",
        is_protected: false
      }
    ],
    file_size_bytes: 4280000,
    storage_consumed_bytes: 12840000,
    potential_savings_bytes: 8560000
  },
  {
    group_id: 502,
    original_file: {
      id: 107,
      original_filename: "invoice-master.xlsx",
      size_bytes: 1320000,
      uploaded_at: "2026-10-08T12:10:00",
      is_protected: true
    },
    duplicate_files: [
      {
        id: 103,
        original_filename: "invoice-backup.xlsx",
        size_bytes: 1320000,
        uploaded_at: "2026-10-09T10:04:00",
        is_protected: false
      }
    ],
    file_size_bytes: 1320000,
    storage_consumed_bytes: 2640000,
    potential_savings_bytes: 1320000
  }
];

export const demoAnalytics: Analytics = {
  total_files: 18,
  total_storage_bytes: 84720000,
  duplicate_files: 5,
  duplicate_storage_bytes: 14140000,
  potential_savings_bytes: 9880000,
  largest_files: [
    demoFiles[4],
    demoFiles[3],
    demoFiles[0]
  ],
  recent_uploads: [
    demoFiles[4],
    demoFiles[3],
    demoFiles[2],
    demoFiles[1]
  ]
};

export const demoDeletionHistory = [
  { id: 205, original_filename: "old-report-download.pdf", size_bytes: 4280000, deleted_at: "2026-10-09T11:05:00", reason: "duplicate cleanup" },
  { id: 204, original_filename: "temp-scan-copy.jpg", size_bytes: 2240000, deleted_at: "2026-10-09T10:47:00", reason: "user confirmed" },
  { id: 203, original_filename: "invoice-duplicate.xlsx", size_bytes: 1320000, deleted_at: "2026-10-08T16:30:00", reason: "duplicate cleanup" }
];

export const demoAuditLogs = [
  {
    id: 308,
    action: "UPLOAD_FILE",
    entity_type: "FILE",
    entity_id: 105,
    description: "File 'archive-video.mp4' was uploaded and queued for hash processing.",
    created_at: "2026-10-09T10:40:00"
  },
  {
    id: 307,
    action: "DUPLICATE_FOUND",
    entity_type: "DUPLICATE_GROUP",
    entity_id: 501,
    description: "Duplicate group created for 'project-report-final.pdf' with 8.6 MB potential savings.",
    created_at: "2026-10-09T09:19:00"
  },
  {
    id: 306,
    action: "DELETE_FILE",
    entity_type: "FILE",
    entity_id: 106,
    description: "File 'old-report-download.pdf' was deleted. Storage freed: 4.3 MB.",
    created_at: "2026-10-09T11:05:00"
  },
  {
    id: 305,
    action: "LOGIN",
    entity_type: "USER",
    entity_id: 1,
    description: "Demo Admin signed in to the storage dashboard.",
    created_at: "2026-10-09T09:00:00"
  }
];
