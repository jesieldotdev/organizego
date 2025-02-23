type STATUS = 'pending' | 'fulfilled' | 'rejected' | 'executing'

interface PayloadStatus {
  value: STATUS
}